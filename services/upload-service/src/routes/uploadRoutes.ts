import { Router } from "express";
import { upload } from "../config/multer.config";
import { routeController } from "../controllers/routeController";

const router = Router();

router.post("/file", upload.single("file"), routeController);

export default router;
