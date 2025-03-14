import express, { Application, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middlewares/errorMiddleware";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

dbConnect();

//middlewares
app.use(express.json());

app.use("/users", authRoutes);

app.use(authMiddleware as NextFunction);

app.get("/", (req, res, next) => {
  const { user } = req as any;
  res.status(200).json({ user: user });
});
app.use(errorHandler);

//listner
app.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});
