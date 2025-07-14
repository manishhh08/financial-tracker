import mongoose, { Schema } from "mongoose";
import userSchema from "./userSchema.js";

const User = mongoose.model("User", userSchema);

//get all users
export const getUsers = () => {
  return User.find();
};

//get user by id
export const getUserById = (id) => {
  return User.findById(id);
};

//get user by filter
export const getUser = (filter) => {
  //filter :{email:'email'}
  return User.findOne(filter);
};

//create user
export const createUser = (userObj) => {
  return User.insertOne(userObj);
};

//update user
export const updateUser = (id, updateObj) => {
  return User.findByIdAndUpdate(id, updateObj);
};

//delete user
export const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};
