const express = require("express");
const router = express.Router();

const { Post, validatePost } = require("../models/post");

const auth = require("../middleware/auth");

//  Post ENDPOINTS

// ! GET ALL POSTS (COMPLETED)
// http://localhost:3011/api/posts
router.get("/", [auth], async (req, res) => {
    try {
        let posts = await Post.find();
        if (!posts) return res.status(400).send(`No Posts in this collection!`);

        return res
            .status(200)
            .send(posts);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// ! GET A Post BY ID  (COMPLETED)
//http://localhost:3007/api/posts/:postId
router.get("/:postId", [auth], async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId);

        if (!post)
            return res
                .status(400)
                .send(`Post with ObjectId: ${req.params.postId}does not exist!`);

        return res
            .status(200)
            .send(post);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// GET posts by userId (IN PROGRESS)
// http://localhost:3011/api/posts/:userId
router.get("/byuserId/:userId", [auth], async (req, res) => {
  try {
    let posts = await Post.find({ userId: req.params.userId });
    if (!posts)
      return res
        .status(400)
        .send(
          `No comments with userId: ${req.params.userId} exist in this collection!`
        );
    return res.send(posts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// ! POST NEW Post TO POSTS  (COMPLETED )
router.post("/", [auth], async (req, res) => {
    try {
        const { error } = validatePost;

        if (error) return res
            .status(400)
            .send(error);
        let newPost = await new Post(req.body);
        await newPost.save();
        let posts = await Post.find();
        return res
            .status(201)
            .send(posts);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//   UPDATE A Post by Id, including text and Likes(COMPLETED)
// https://localhost:3007/api/posts/:postId
router.put("/:postId", [auth], async (req, res) => {
    try {
        const { error } = validatePost(req.body);
        if (error) return res
            .status(400)
            .send(error);

        let post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
            new: true,
        });
        if (!post)
            return res
                .status(400)
                .send(`Post  with Objectid ${req.params.postId} does not exist.`);

        return res
            .send(post);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

//! DELETE A COMMENT BY ID COMPLETED
router.delete("/:postId", [auth], async (req, res) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.postId);

        if (!post)
            return res
                .status(400)
                .send(`Post with ObjectId: ${req.params.postId} does not exist!`);

        return res
            .send(post);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

module.exports = router;
