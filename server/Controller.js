import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, books } from "./Models/Model.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

//
// Register
// Quries using the model
//
const register = async (req, res, next) => {
  try {
    let { email, password, username } = req.body;
    email = email.trim();
    username = username.trim();
    password = password.trim();
    const name = username;
    console.log(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      // Replace with your secret key
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //Response
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
//
// Login
//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      // Replace with your secret key
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    console.log(user.id, "User ID");
    //Response
    res.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

//
// Get profile
// Gets info like and id, email, and name of the user from the database
//

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  console.log(req.body);
  try {
    const BookId = uuidv4();
    const UserId = req.user.userId;
    const { BookName, Description } = req.body;
    console.log({
      BookId,
      BookName,
      Description,
      UserId,
    });
    const newBook = await books.create({
      BookId,
      BookName,
      Description,
      UserId,
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export { register, login, getProfile, addBook };
