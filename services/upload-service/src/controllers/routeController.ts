import { Request, Response, NextFunction } from "express";
import { normalize } from "path";

interface RouteRequest extends Request {
  file?: Express.Multer.File;
}

export const routeController = async (
  req: RouteRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    try {
      //   await routeService(req);
      res.status(200).json({ success: true, file: req.file?.originalname });
    } catch (error) {
      next(error);
    }
  }
};
