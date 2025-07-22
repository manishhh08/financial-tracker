import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import mongoConnection from "./config/mongoConfig.js";

import { loginUser, registerUser } from "./controller/authControllers.js";
import {
  createTranscations,
  deleteTransaction,
  getTransactions,
} from "./controller/transactionControllers.js";
import { auth } from "./middleware/authMiddleware.js";
const app = express();
const PORT = 4000;

app.use(cors());

//request body
app.use(express.json());

//  routes
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Financial tracker API is the new project",
  });
});

// auth routes
//create user
app.post("/api/v1/auth", registerUser);

//login user
app.post("/api/v1/auth/login", loginUser);

//transaction
//create a transaction
app.post("/api/v1/transactions", auth, createTranscations);
//get a transaction
app.get("/api/v1/transactions", auth, getTransactions);
//delete a transaction
app.delete("/api/v1/transactions/:id", auth, deleteTransaction);

app.get("/api/v1/dahsboard", (req, res) => {
  try {
  } catch (err) {
    return res.json({
      status: false,
      message: "Dashboard metrics not found",
    });
  }
  return res.json({
    status: true,
    message: "dashboard metrics",
    metrics: {
      income: 100,
      expense: 3000,
      balance: 100 - 3000,
      lastTransaction: {
        description: "grocery",
        amount: 100,
        type: "income",
      },
    },
  });
});
//mongo connection
mongoConnection()
  .then(() => {
    console.log("Mongo connection successful");
    //listen
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server error");
      } else {
        console.log("Server started at port :", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(error.message);
    console.log("Mongo connection error");
  });
