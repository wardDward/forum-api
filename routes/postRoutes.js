import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

export default router;
