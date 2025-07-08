import mongoose, { Schema } from "mongoose";
import userSchema from "./userSchema.js";

const User = mongoose.model("User", userSchema);

export const getUser = () => {
  return User.find();
};

export const getUserById = (id) => {
  return User.findById(id);
};

export const createUser = (userObject) => {
  return User.insertOne(userObject);
};
