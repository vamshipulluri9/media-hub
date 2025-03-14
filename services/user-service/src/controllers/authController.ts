//create to end points registerUser and loginUser
import { Request, Response, NextFunction } from "express";
import { registerService, loginService } from "../services/authService";
import { generateToken } from "../utils/jwtHelper";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerService(req);
    res
      .status(201)
      .json({ message: "user registered successfully", user: user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginService(req);
    res.status(200).json({
      success: true,
      message: "login successfull",
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role as string),
    });
  } catch (error) {
    next(error);
  }
};
