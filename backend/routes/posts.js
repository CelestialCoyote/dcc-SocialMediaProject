const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const { Post, validatePost } = require("../models/post");

const auth = require("../middleware/auth");

//GET all posts from friends
router.get("/:userID/friendsPosts", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userID} does not exist!`);

    let friends = await User.find({ _id: { $in: user.friends } });
    let concatPosts = [];
    let allPosts = friends.map((friend) => {
      concatPosts = [...concatPosts, ...friend.posts];
    });

    return res.status(200).send(concatPosts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// GET a single Post by userID and postID.
router.get("/:userID/getSinglePost/:postID", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userID} does not exist!`);

    let post = user.posts.id(req.params.postID);
    if (!post)
      return res
        .status(400)
        .send(`Post with Objectid ${req.params.postID} does not exist.`);

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// GET all posts by user using the userID.
router.get("/:userID/allPosts", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);

    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userID} does not exist!`);

    return res.status(200).send(user.posts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// POST add a new Post to User.posts array.
router.post("/:userID/createPost", auth, async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(`Body for post not valid! ${error}`);

    let user = await User.findById(req.params.userID);
    if (!user)
      return res
        .status(400)
        .send(`User with ObjectId ${req.params.userID} does not exist.`);

    const post = new Post(req.body);
    user.posts.push(post);
    await user.save();

    const token = user.generateAuthToken(); // Add to any route where user should be updated

    return res
        .status(200)
        .send(user.posts)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token");
        
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// UPDATE a user post by postID, including text and likes.
router.put("/:userID/updatePost/:postID", [auth], async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(`Body for post not valid! ${error}`);

    let user = await User.findById(req.params.userID);
    if (!user)
      return res
        .status(400)
        .send(`User with ObjectId ${req.params.userID} does not exist.`);

    let post = user.posts.id(req.params.postID);
    if (!post)
      return res
        .status(400)
        .send(`Post with Objectid ${req.params.postID} does not exist.`);

    post.text = req.body.text;
    post.likes = req.body.likes;
    await user.save();

    return res
        .status(200)
        .send(user.posts)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token");

  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// DELETE a user post by postID.
router.delete("/:userID/deletePost/:postID", [auth], async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    if (!user)
      return res
        .status(400)
        .send(`User with ObjectId ${req.params.userID} does not exist.`);

    user.posts.id(req.params.postID).remove();

    await user.save();

    return res
        .status(200)
        .send(user.posts)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token");
        
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// return res
// .status(200)
// .send(user.posts)
// .header("x-auth-token", token)
// .header("access-control-expose-headers", "x-auth-token");

module.exports = router;
