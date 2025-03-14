import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: String, //can add validations here
  email: String,
  password: String,
  role: String,
});

export default mongoose.model("User", userSchema);

//to-do
// validations expermentation
