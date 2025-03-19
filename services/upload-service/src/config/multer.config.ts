import multer from "multer";
import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

//aws storage // error might be here on env variables
const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET as string,
  },
});

const awsStorage = multerS3({
  s3,
  bucket: "media-hub-bucket-test",
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => cb(null, `raw/${Date.now()}-${file.originalname}`),
});

export const upload = multer({
  storage: localStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "video/mp4",
      "vedio/mpeg",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});
