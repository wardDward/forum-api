import express from "express";
import { createTag, getSpecificTag, getTags } from "../controllers/tagController.js";
const router = express.Router();

router.route("/").get(getTags).post(createTag);
router.route('/:_id').get(getSpecificTag)


export default router;
