import bcrypt from "bcryptjs";
import { createUser, getUser, updateUser } from "../models/users/userModel.js";
import jwt from "jsonwebtoken";
import { sendEmailVerificationTemplate } from "../utils/emailProcessor.js";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (req, res) => {
  try {
    let userObj = req.body;

    //encrypt password
    let salt = bcrypt.genSaltSync(10);
    //  let salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
    userObj.password = bcrypt.hashSync(userObj.password, salt);

    let newUser = await createUser(userObj);
    if (newUser._id) {
      //create unique token and update in db
      const emailVerificationToken = uuidv4();
      const result = await updateUser(newUser._id, { emailVerificationToken });

      //send email verification with token
      const url =
        process.env.ROOT_DOMAIN +
        `/verify-email?t=${emailVerificationToken}&email=${newUser.email}`;

      sendEmailVerificationTemplate({
        to: newUser.email,
        url,
        userName: newUser.username,
      });
    }

    return res.status(201).json({
      status: true,
      message: "User created successfully, please verify your email",
      // newUser,
    });
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("E11000")) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or username",
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
    // login user
    // let email = req.body.email;
    // let pasword = req.body.password;

    let { email, password } = req.body;

    // fetch user fro database
    let user = await getUser({ email: email });
    if (!user?.status && !user?.isEmailVerified) {
      return res.status(401).json({
        status: false,
        message:
          "Your email is not verified or account is inactive, contact admin!",
      });
    }

    if (user) {
      // user found
      // user.password -> db password
      // compare password with user.password
      let passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        user.password = "";

        let payload = {
          email: user.email,
        };

        let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          // expiresIn: process.env.JWT_EXPIRES_IN,
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
          message: "User not authenticated!",
        });
      }
    } else {
      // user not found
      return res.status(401).json({
        status: false,
        message: "The combination of email and password is incorrect!",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "SERVER ERROR",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    let token = req.query.t;
    let email = req.query.email;

    let user = await getUser({ email: email });

    if (user) {
      // let updatedUSer = await updateUser(
      //   { email: email },
      //   { isEmailVerified: true }
      // );

      if (user.isEmailVerified) {
        return res.json({
          status: false,
          message: "User already verified",
        });
      }

      if (user.emailVerificationToken === token) {
        user.isEmailVerified = true;
        user.emailVerificationToken = "";
        await user.save();

        return res.json({
          status: true,
          message: "Verified",
        });
      } else {
        return res.json({
          status: false,
          message: "Email could not be verified",
        });
      }
    } else {
      return res.json({
        status: false,
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({
      status: false,
      message: "Verification Failed",
    });
  }
};
