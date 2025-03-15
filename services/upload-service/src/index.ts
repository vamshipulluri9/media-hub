import express, { Application } from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import cors from "cors";

const app: Application = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
  })
);

app.use(express.json());

app.use("/upload/", uploadRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("upload service is running on port: " + PORT);
});
