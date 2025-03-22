import { Router } from "express";
import { processController } from "../controllers/encodeController";

const router = Router();

router.post("/encode", processController);

export default router;
