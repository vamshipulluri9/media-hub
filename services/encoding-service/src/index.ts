import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorMiddleware";
import encodeRoutes from "./routes/encodeRoutes";
import { consumeFromKafka } from "./config/kafka";
import { encodeVideo } from "./encode";

const app = express();
dotenv.config();
app.use(express.json());

consumeFromKafka(encodeVideo);

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log("encoding service started on port : " + process.env.PORT);
});
