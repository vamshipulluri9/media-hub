import fs from "fs";
import path, { resolve } from "path";
import ffmpeg from "fluent-ffmpeg";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const OUTPUT_DIR = path.join(__dirname, "../../processed");

export const encodeVideo = async (videoData: {
  videoUrl: any;
  videoTitle: string;
}) => {
  const videoFile = videoData?.videoTitle;

  const inputPath = `${UPLOAD_DIR}/${videoFile}`;
  const outputFolder = `${OUTPUT_DIR}/${videoFile.split(".")[0]}`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-preset fast",
        "-g 48",
        "-sc_threshold 0",
        "-hls_time 10",
        "-hls_playlist_type vod",
        `-hls_segment_filename ${outputFolder}/segment_%03d.ts`,
      ])
      .output(`${outputFolder}/playlist.m3u8`)
      .on("end", () => {
        console.log(`Encoding finished: ${videoFile}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Encoding error: ${err.message}`);
        reject(err);
      })
      .run();
  });
};
