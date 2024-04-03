import express from "express";
import refreshToken from "../utils/refreshToken.js";

const router = express.Router();

router.post("/refresh", refreshToken);

export default router;
