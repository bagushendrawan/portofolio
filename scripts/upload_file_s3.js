import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import path from "path";

const s3Client = new S3Client({ region: "ap-southeast-2" });
const BUCKET_NAME = "your-bucket-name";

async function uploadFileAndGetPresignedUrl(filePath, expiresIn = 3600) {
    const filename = path.basename(filePath);
    const uniqueKey = `uploads/${randomUUID()}/${filename}`;
    const fileContent = readFileSync(filePath);

    // Upload the file
    await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: uniqueKey,
        Body: fileContent,
    }));

    // Generate a presigned URL
    const presignedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: uniqueKey }),
        { expiresIn }
    );

    return { key: uniqueKey, url: presignedUrl };
}

// Usage
const { key, url } = await uploadFileAndGetPresignedUrl("/path/to/your/file.pdf");
console.log("Key:", key);
console.log("Presigned URL:", url);
