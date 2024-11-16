const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { createClient } = require("redis");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const {
  KEY,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  BUCKET_NAME,
  REGION,
  OUTPUT_BUCKET,
  REDIS_URL,
  REDIS_KEY,
  MONGO_URI,
} = process.env;

console.log(REGION, S3_ACCESS_KEY, S3_SECRET_KEY);

const config = {
  region: REGION || "ap-south-1",
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
};

const client = new S3Client(config);

const publisher = createClient({
  url: REDIS_URL,
});

publisher.on("error", (err) => {
  console.error("Redis error:", err);
});

publisher.connect();

const uploadToS3 = async (KEY) => {
  await publisher.set(`redis_${REDIS_KEY}`, "Converted");

  const finalPath = path.join(__dirname, "output");

  try {
    const files = fs.readdirSync(finalPath);

    // Array to store promises for each file upload
    const uploadPromises = files.map((file) => {
      return Upload(`${finalPath}/${file}`, KEY);
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises); 

    console.log("All files uploaded to S3");

    // Set Redis key to true after all uploads are done
    await publisher.set(`redis_${REDIS_KEY}`, "Uploaded");
  } catch (err) {
    console.error("Error uploading files:", err);
    // Handle error and set Redis key to false if upload fails
    // await publisher.set(`${KEY}_redis`, "false");
  }
};

const Upload = async (filePath, key) => {

  try {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: OUTPUT_BUCKET,
      Key: `${key}/${path.basename(filePath)}`,
      Body: fileStream,
      ContentType: "video/mp4",
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await client.send(command);

    console.log(`File ${filePath} uploaded successfully`);
  } catch (error) {
    console.error(`Error uploading file ${filePath}:`, error);
    throw error; // Propagate error for centralized handling
  }
};

uploadToS3(KEY)
  .then(() => {
    console.log("Upload process completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Upload process failed:", error);
    process.exit(1); // Exit with error code
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit with error code on unhandled rejection
});
