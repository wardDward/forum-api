import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import { body, validationResult } from "express-validator";

const createPostValidator = [
  body("title", "Title is required").not().isEmpty(),
  body("description", "Body is required").not().isEmpty(),
  body("tags", "Tags is required").not().isEmpty(),
];

const createPost = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  const authUser = req.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = await Post.create({
    user: authUser,
    title,
    description,
    tags,
  });

  return res.status(201).json(post); // Send the response after successful creation
});

const getAllPost = asyncHandler(async (req, res) => {
  console.log(res);
  const posts = await Post.find();
  if (posts.length === 0) {
    res.status(404);
    throw new Error("No Post Found");
  }
  return res.status(200).json({ posts: posts });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  if (!post) {
    res.status(404);
    throw new Error("No Post Found");
  }
  return res.status(200).json({
    post: post,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const post = await Post.findById(req.params.id);
  console.log(req);
  if (!post) {
    res.status(404);
    throw new Error("No Post Found");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
    },
    {
      new: true,
    }
  );

  return res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(req);
  if (!post) {
    res.status(404);
    throw new Error("No Post Found");
  }
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  return res.send(deletedPost);
});

const searchByTag = asyncHandler(async (req, res) => {
  await res.send("search by tag");
});

export {
  createPost,
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  createPostValidator,
};
