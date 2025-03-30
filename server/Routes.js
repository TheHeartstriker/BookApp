import { Router } from "express";
import {
  register,
  login,
  getProfile,
  addBook,
  getBooks,
  deleteBook,
  updateBook,
} from "./Controller.js";
import { authenticate } from "./MiddleWare/AuthMiddleWare.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.post("/addBook", authenticate, addBook);
router.get("/getBooks", authenticate, getBooks);
router.delete("/deleteBook", authenticate, deleteBook);
router.put("/updateBook", authenticate, updateBook);
router.get("/validateToken", authenticate, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
