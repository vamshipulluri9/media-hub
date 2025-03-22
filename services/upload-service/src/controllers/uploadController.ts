import { Request, Response, NextFunction } from "express";
import { metadataService, sendToKafka } from "../services/uploadService";

interface RouteRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadController = async (
  req: RouteRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    res.status(400).send("file not uploaded");
    return;
  }

  res.status(200).json({
    success: true,
    file: req.file?.originalname,
    // fileUrl: (req.file as any).location,
    filePath: req.file.path,
  });

  try {
    const metadata = await metadataService(req);

    const videoData = {
      videoUrl: (req.file as any).location,
      videoTitle: req.file.originalname,
    };

    await sendToKafka(videoData);

    res.status(201).json({
      success: true,
      message: "file and its metadata uploaded and started encoding",
    });
  } catch (error) {
    next(error);
  }
};
