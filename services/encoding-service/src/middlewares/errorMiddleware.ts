import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message;

  res.status(statusCode).json({ success: false, message: message });
  next();
};

export default errorMiddleware;
