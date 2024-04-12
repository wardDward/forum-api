import asyncHandler from "express-async-handler";
import Tag from "../models/tagModels.js";

const searchTag = asyncHandler(async (req, res) => {
  const query = req.query.q;
  let tags;

  if (!query) {
    tags = await Tag.find();
  } else {
    tags = await Tag.findOne().byName(query);
  }

  if (!tags) {
    return res.status(404).json({ result: "No Tag Found" });
  }

  return res.status(200).json({ tags });
});

const createTag = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const existingTag = await Tag.findOne().byName(name);

  if (existingTag) {
    return res.status(400).json({ error: "Tag already exists" });
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

export { createTag, searchTag };
