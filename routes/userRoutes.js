import express from "express";
import {
  authenticatedUser,
  loginUser,
  registerUser,
  registerValidator,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginUser);
router.get("/authenticated", authenticatedUser);

export default router;
