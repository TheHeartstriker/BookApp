import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//Import database functions
import { checkUsername, GetUserId } from "./DbFunctions.js";
//Import auth functions
import { login, signup, authenticateJWT } from "./Auth.js";

//Configures the environment variables and express
dotenv.config();
const app = express();

//cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//For the database connection
//Database pool
const pool = mysql.createPool({
  host: process.env.MY_HOST,
  user: process.env.MY_USER,
  password: process.env.MY_PASS,
  database: process.env.MY_DB,
});

//Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Stores the user id for the current user
let userIdGet = "";
//Stores the date for the current user
let dateGet = "";

// Sends username and login to the database and if successful sends the user id back to the front
app.post("/api/login", async (req, res) => {
  const { username, password, date } = req.body;
  try {
    const result = await login(username, password);
    if (result) {
      const userId = await GetUserId(username, password);
      userIdGet = userId;
      dateGet = date;
      const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: "strict",
      });
      res.status(200).send({ success: true });
    } else {
      res.status(401).send(false);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

// Simply sends a username and password to the database to be inserted
app.post("/api/signup", async (req, res) => {
  const { username, password, UserId, date } = req.body;
  try {
    userIdGet = UserId;
    dateGet = date;
    await signup(username, password, UserId);
    const token = jwt.sign({ UserId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
    });
    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

//Checks if the username is already in use
app.post("/api/checkUsername", async (req, res) => {
  const { username } = req.body;
  try {
    const result = await checkUsername(username);
    if (result) {
      res.status(200).send(true);
    } else {
      res.status(401).send(false);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export { pool, userIdGet, dateGet };
