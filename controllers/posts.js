import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// Status codes list for rest api
// https://www.restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // console.log(postMessages)
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

// posts/{id}
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Oops! Post not found. Try again.");

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(409).json({ message: err.message });
  }
};

//for delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Oops! Post not found. Try again.");
  try {
    await PostMessage.findByIdAndRemove(id);

    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    return res.status(409).json({ message: err.message });
  }
};

//for like post
export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Oops! Post not found. Try again.");

  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    return res.status(409).json({ message: err.message });
  }
};
