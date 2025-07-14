import bcrypt from "bcryptjs";
import { createUser, getUser } from "../models/users/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    let userObj = req.body;

    //encrypt password
    let salt = bcrypt.genSaltSync(10);
    userObj.password = bcrypt.hashSync(userObj.password, salt);

    let newUser = await createUser(userObj);

    return res.status(201).json({
      status: true,
      message: "user created",
      newUser,
    });
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("E11000")) {
      return res.status(400).json({
        status: false,
        message: "Email already used",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    // let email = req.body.email;
    // let password = req.password.password;
    let { email, password } = req.body;
    let user = await getUser({ email: email });
    if (user) {
      //user found
      //user.password retrieved from db
      //compare received password with db
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (comparePassword) {
        user.password = "";

        let payload = {
          email: user.email,
        };

        let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.EXPIRES_IN,
        });
        return res.status(200).json({
          status: true,
          message: "Login Successful",
          user,
          accessToken,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Password not match",
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "Login failed",
    });
  }
};
