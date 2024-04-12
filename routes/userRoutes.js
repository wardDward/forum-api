import express from "express";
import validateToken from "../middleware/validateToken.js";
import {
  authenticatedUser,
  loginUser,
  registerUser,
  registerValidator,
  loginValidator,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login",loginValidator, loginUser);

router.get("/authenticated", validateToken ,authenticatedUser);

export default router;
