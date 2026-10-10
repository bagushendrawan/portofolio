import test from "node:test";
import assert from "node:assert/strict";
import {
  mediaType,
  parseLfsPointer,
  publicUrl,
  replaceLocalReferences,
} from "./upload-media-s3.mjs";

test("maps media types and stable public URLs", () => {
  assert.equal(mediaType("demo.MP4"), "video/mp4");
  assert.equal(mediaType("logo.svg"), "image/svg+xml");
  assert.equal(mediaType("resume.pdf"), null);
  assert.equal(
    publicUrl("my-bucket", "ap-southeast-2", "portfolio/projects/a file.mp4"),
    "https://my-bucket.s3.ap-southeast-2.amazonaws.com/portfolio/projects/a%20file.mp4",
  );
});

test("detects LFS pointers rather than uploading them as video", () => {
  const oid = "a".repeat(64);
  assert.deepEqual(
    parseLfsPointer(`version https://git-lfs.github.com/spec/v1\noid sha256:${oid}\nsize 100\n`),
    { oid, size: 100 },
  );
  assert.equal(parseLfsPointer("real video content"), null);
});

test("replaces exact local references but keeps existing remote URLs", () => {
  const replacements = [["/icon.png", "https://example.com/portfolio/icon.png"]];
  assert.equal(
    replaceLocalReferences('"/icon.png" "/icon.png.bak" "https://old.example/icon.png" ![](/icon.png)', replacements),
    '"https://example.com/portfolio/icon.png" "/icon.png.bak" "https://old.example/icon.png" ![](https://example.com/portfolio/icon.png)',
  );
});
