import jwt from "jsonwebtoken";
import { getUser } from "../models/users/userModel.js";

export const auth = async (req, res, next) => {
  //if auth go to next step
  //else respond with error
  try {
    let accessToken = req.headers.authorization;

    let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log(accessToken);
    console.log("decoded value:", decoded);
    let user = await getUser({ email: decoded.email });

    if (user) {
      user.password = "";
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "Unauthorised!!!",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Unauthorised!!!",
    });
  }
};
