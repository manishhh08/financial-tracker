import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: string,
      required: true,
    },
    role: {
      type: String,
      default: "Customer",
    },
  },
  { timestamps: true }
);
export default userSchema;
