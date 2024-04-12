import express from "express";
import { createTag, searchTag } from "../controllers/tagController.js";
const router = express.Router();

router.route("/").get(searchTag).post(createTag);

export default router;
