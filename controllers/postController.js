import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import PostView from "../models/postViewModel.js";
import Notification from "../models/notificationModel.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const authUser = req.user;
  if (!title || !content) {
    return res.status(422).json({
      errors: {
        ...(title ? {} : { title: ["Post title is required"] }),
        ...(content ? {} : { content: ["Content is required"] }),
      },
    });
  }

  if (tags.length === 0) {
    return res.status(422).json({
      errors: {
        tags: ["Choose atleast one related tag"],
      },
    });
  }

  const post = await Post.create({
    user: authUser,
    title,
    content,
    tags,
  });

  if (post) {
    await Notification.create({
      sender_id: authUser._id,
      receiver_id: authUser._id,
      about: `${post.title} your post has been published.`,
      type: "post",
    });
  }

  return res.status(201).json({
    post,
  });
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  if (!posts) {
    return res.status(404).json({ posts: ["No Post Found"] });
  }
  return res.status(200).json({ posts: posts });
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById({ _id: req.params.id }).populate("tags");
  if (!post) {
    return res.status(404).json({ errors: ["No Post Found"] });
  }

  const user = req.user;

  if (user) {
    const view = await PostView.create({
      post_id: post,
      user_id: user._id,
    });
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

export { createPost, getAllPost, getPost, updatePost, deletePost };
