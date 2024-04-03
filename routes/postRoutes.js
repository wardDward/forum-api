import express from "express";
import {
  createPost,
  createPostValidator,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllPost).post(createPostValidator, createPost);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

export default router;
