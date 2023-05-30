import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js"; // important de mettre le js
// import verifyPassword from "../middleware/verifyPassword.js";

const router = express.Router();

// authUser
// router.post("/register", registerUser, verifyPassword); //'/api/auth/signup'
router.post("/register", registerUser); //'/api/auth/signup'

router.post("/login", loginUser);

export default router;
