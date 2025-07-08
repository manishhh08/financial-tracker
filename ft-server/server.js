import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import mongoConnection from "./config/mongoConfig.js";

const app = express();
const PORT = 4000;

app.use(cors());

//request body

app.use(express.json());

//base get api

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Financial tracker API is the new project",
  });
});

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
    console.log("Mongo connection error");
  });
