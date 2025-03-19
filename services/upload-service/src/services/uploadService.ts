import { Request } from "express";
import Video from "../models/video";
import { producer } from "../config/kafka";

export const metadataService = async (req: Request) => {
  if (!req.file?.path || !req.file?.filename)
    throw new Error("filePath or title is missing");

  return await Video.create({
    title: req.file?.filename,
    description: "",
    filePath: req.file.path,
    length: req.file.size,
  });
};

export const sendToKafka = async (videoData: {
  videoUrl: any;
  videoTitle: string;
}) => {
  await producer.connect();
  await producer.send({
    topic: "video-uploads",
    messages: [{ value: JSON.stringify(videoData) }],
  });
  await producer.disconnect();
};
