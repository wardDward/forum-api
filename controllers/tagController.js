import asyncHandler from "express-async-handler";
import Tag from "../models/tagModels.js";
import Post from "../models/postModel.js";
const getTags = asyncHandler(async (req, res) => {
  const query = req.query.q;
  let tags;

  if (!query) {
    tags = await Tag.find();
  } else {
    tags = await Tag.find({ name: { $regex: query, $options: "i" } });
  }

  if (!tags) {
    return res.status(404).json({ result: "No Tag Found" });
  }

  return res.status(200).json({ tags });
});

const getSpecificTag = asyncHandler(async (req, res) => {
  const id = req.params._id;

  // Find the tag
  const tag = await Tag.findOne({ _id: id });

  if (!tag) {
    return res.status(404).json({
      errors: ["No Tag Found"],
    });
  }

  // Aggregate to find related posts and count them
  const [relatedPosts, countRelatedPost] = await Promise.all([
    Post.find({ tags: id }),
    Post.countDocuments({ tags: id }),
  ]);

  return res.status(200).json({
    tag,
    posts: relatedPosts,
    postCount: countRelatedPost,
  });
});

const createTag = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(422).json({
      errors: {
        ...(name ? {} : { name: ["Tag name is required"] }),
        ...(description
          ? {}
          : { description: ["Tag description is required"] }),
      },
    });
  }

  const existingTag = await Tag.findOne({ name });

  if (existingTag) {
    console.log(existingTag);
    return res.status(422).json({
      errors: {
        name: ["Tag already exists"],
      },
    });
  }

  const newTag = await Tag.create({
    name,
    description,
  });

  return res.status(201).json({
    newTag,
    status: 201,
    message: "Tag is created Succesfully",
  });
});

export { createTag, getTags, getSpecificTag };
