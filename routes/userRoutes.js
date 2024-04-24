import express from "express";
import validateToken from "../middleware/validateToken.js";
import {
  authenticatedUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/authenticated", validateToken, authenticatedUser);

export default router;
