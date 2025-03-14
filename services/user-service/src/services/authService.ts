import User from "../models/userSchema";
import { Request } from "express";
import bcrypt from "bcryptjs";

export const registerService = async (req: Request) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("user already exists");

  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT as string, 10)
  );

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    role: "user",
  });
  await newUser.save();

  return newUser;
};

export const loginService = async (req: Request) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("type your username correctly");

  if (!user.password) throw new Error("Password is missing");
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  } else throw new Error("Incorrect password");
};
