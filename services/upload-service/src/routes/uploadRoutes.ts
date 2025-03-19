import { Router } from "express";
import { upload } from "../config/multer.config";
import { uploadController } from "../controllers/uploadController";

const router = Router();

router.post("/file", upload.single("file"), uploadController);

export default router;
