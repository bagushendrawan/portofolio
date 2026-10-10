import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(root, "public");
const contentTypes = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

export function mediaType(file) {
  return contentTypes[path.extname(file).toLowerCase()] ?? null;
}

export function publicUrl(bucket, region, key) {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  const host = `s3.${region}.amazonaws.com`;
  return bucket.includes(".")
    ? `https://${host}/${encodeURIComponent(bucket)}/${encodedKey}`
    : `https://${bucket}.${host}/${encodedKey}`;
}

export function parseLfsPointer(text) {
  const match = /^version https:\/\/git-lfs\.github\.com\/spec\/v1\noid sha256:([a-f0-9]{64})\nsize (\d+)\n?$/.exec(text);
  return match ? { oid: match[1], size: Number(match[2]) } : null;
}

export function replaceLocalReferences(source, replacements) {
  let output = source;
  for (const [local, remote] of replacements) {
    for (const [before, after] of [["\"", "\""], ["'", "'"], ["(", ")"]]) {
      output = output.replaceAll(`${before}${local}${after}`, `${before}${remote}${after}`);
    }
  }
  return output;
}

async function walk(directory, accept) {
  const found = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await walk(file, accept));
    else if (entry.isFile() && accept(file)) found.push(file);
  }
  return found.sort();
}

async function restoreLfsVideo(file) {
  const stat = await fs.stat(file);
  if (stat.size > 256) return;
  const pointer = parseLfsPointer(await fs.readFile(file, "utf8"));
  if (!pointer) return;
  const gitDir = execFileSync("git", ["rev-parse", "--git-common-dir"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  const object = path.resolve(root, gitDir, "lfs", "objects", pointer.oid.slice(0, 2), pointer.oid.slice(2, 4), pointer.oid);
  let cached;
  try {
    cached = await fs.stat(object);
  } catch {
    throw new Error(`${path.relative(root, file)} is an LFS pointer and its ${pointer.size}-byte object is missing. Run git lfs pull before uploading.`);
  }
  if (cached.size !== pointer.size)
    throw new Error(`LFS cache size mismatch for ${path.relative(root, file)}.`);
  await fs.copyFile(object, file);
  console.log(`Restored ${path.relative(root, file)} from the local LFS cache`);
}

async function prepareRewrites(replacements) {
  const files = [
    ...await walk(path.join(root, "content"), (file) => /\.(json|md)$/.test(file)),
    ...await walk(path.join(root, "src"), (file) => /\.(tsx?|css)$/.test(file)),
  ];
  const edits = [];
  for (const file of files) {
    const before = await fs.readFile(file, "utf8");
    const after = replaceLocalReferences(before, replacements);
    if (before !== after) edits.push({ file, after });
  }
  return edits;
}

async function main() {
  const bucket = process.env.S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  if (!bucket || !region)
    throw new Error("Set S3_BUCKET_NAME and AWS_REGION in .env or the environment.");

  const files = await walk(publicDir, (file) => mediaType(file) !== null);
  if (!files.length) throw new Error("No images or videos found under public/.");
  for (const file of files) await restoreLfsVideo(file);

  const records = files.map((file) => {
    const relative = path.relative(publicDir, file).split(path.sep).join("/");
    const key = `portfolio/${relative}`;
    return { file, relative, key, url: publicUrl(bucket, region, key) };
  });
  const replacements = records.map(({ relative, url }) => [`/${relative}`, url]);
  const edits = await prepareRewrites(replacements);
  const s3 = new S3Client({ region });

  for (const record of records) {
    console.log(`Uploading ${record.relative}`);
    await new Upload({
      client: s3,
      params: {
        Bucket: bucket,
        Key: record.key,
        Body: createReadStream(record.file),
        ContentType: mediaType(record.file),
      },
      queueSize: 4,
      partSize: 8 * 1024 * 1024,
      leavePartsOnError: false,
    }).done();
    const response = await fetch(record.url, { method: "HEAD", signal: AbortSignal.timeout(20_000) });
    if (!response.ok)
      throw new Error(`${record.url} is not publicly readable (HTTP ${response.status}). Configure public s3:GetObject access, then rerun.`);
  }

  for (const { file, after } of edits) await fs.writeFile(file, after);
  const attributesFile = path.join(root, ".gitattributes");
  const attributes = await fs.readFile(attributesFile, "utf8");
  const withoutLfs = attributes.replace(/^\*\.mp4 filter=lfs diff=lfs merge=lfs -text\r?\n?/m, "");
  if (withoutLfs !== attributes) await fs.writeFile(attributesFile, withoutLfs);
  execFileSync("git", ["rm", "-f", "--cached", "--ignore-unmatch", "--", ...records.map(({ file }) => path.relative(root, file))], {
    cwd: root,
    stdio: "inherit",
  });
  console.log(`Uploaded and verified ${records.length} files; updated ${edits.length} source files and removed media from Git tracking.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
