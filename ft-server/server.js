import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import mongoConnection from "./config/mongoConfig.js";

import {
  loginUser,
  registerUser,
  verifyEmail,
} from "./controller/authControllers.js";
import {
  createTranscations,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./controller/transactionControllers.js";
import { auth } from "./middleware/authMiddleware.js";
import {
  getTransactionsByUserId,
  updateTranscationByUserId,
} from "./models/transactions/transactionModel.js";

//start backend
const app = express();
const PORT = 4000;

app.use(cors());

//request body
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Financial tracker API is the new project",
  });
});

// User authentication routes
//create user
app.post("/api/v1/auth", registerUser);

//login user
app.post("/api/v1/auth/login", loginUser);

//get user detail
app.get("/api/v1/auth/user", auth, (req, res) => {
  return res.json({
    status: true,
    message: "User Detail Retrieved!!!",
    user: req.user,
  });
});

// verify email
app.get("/api/v1/verify-email", verifyEmail);

//Dashboard route
app.get("/api/v1/dashboard", auth, async (req, res) => {
  let userId = req.user._id;

  let transactions = await getTransactionsByUserId(userId);

  //console.log(">>>>>", transactions);

  transactions.sort((a, b) => b.date - a.date);

  let income = transactions.reduce((acc, item) => {
    return item.type === "income" ? acc + item.amount : acc;
  }, 0);

  let expense = transactions.reduce((acc, item) => {
    return item.type === "expense" ? acc + item.amount : acc;
  }, 0);

  let balance = income - expense;

  let responseObject = {
    status: true,
    message: "Metrics",
    metrics: {
      income,
      expense,
      balance,
      transaction_no: transactions.length,
      last_transaction: transactions[0],
    },
  };

  return res.json(responseObject);
});

//Transaction routes
//create a transaction
app.post("/api/v1/transactions", auth, createTranscations);

//get a transaction
app.get("/api/v1/transactions", auth, getTransactions);

//delete a transaction
app.delete("/api/v1/transactions/", auth, deleteTransaction);

//update a transaction
app.patch("/api/v1/transactions/:id", auth, updateTransaction);

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
    console.log(err.message);
    console.log("Mongo connection error");
  });
