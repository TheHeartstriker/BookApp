import { Router } from "express";
import { register, login, getProfile, addBook } from "./Controller.js";
import { authenticate } from "./MiddleWare/AuthMiddleWare.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.post("/addBook", authenticate, addBook);

export default router;
