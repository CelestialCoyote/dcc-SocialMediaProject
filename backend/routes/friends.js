const { User } = require("../models/user");
const fileUpload = require("../middleware/file_upload");

const auth = require("../middleware/auth");
//const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();


// GET all users except user and friend and pending friends.
router.get("/:userID/notCurrentUserNotFriends", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        const users = await User.find({
            '_id': { $nin: user.friends, $ne: req.params.userID }
        });

        return res
            .send(users);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET all friends of user.
router.get("/:userID/allFriends", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let friends = await User.find({
            '_id': { $in: user.friends }
        });

        return res
            .send(friends);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET all friends of user.
router.get("/:userID/allPendingFriends", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let pendingFriends = await User.find({
            '_id': { $in: user.pendingFriends }
        });

        return res
            .send(pendingFriends);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to add a friend to a user's friends array.
router.put("/:userID/friendToAdd/:friendID", [auth], async (req, res) => {
    try {
        let friendToAdd = await User.findById(req.params.friendID);
        if (!friendToAdd)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        if (user.friends.includes(friendToAdd._id))
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.friendID} already a friend.`);

        friendToAdd.friends.push(user);
        user.friends.push(friendToAdd);
        await user.save();
        await friendToAdd.save();

        const token = user.generateAuthToken(); // Add to any route where user should be updated

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send([user, friendToAdd]);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to remove a friend from a user's friends array.
router.put("/:userID/friendToRemove/:friendID", [auth], async (req, res) => {
    try {
        let friendToRemove = await User.findById(req.params.friendID);
        if (!friendToRemove)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        user.friends.splice(user.friends.indexOf(friendToRemove._id), 1);
        friendToRemove.friends.splice(friendToRemove.friends.indexOf(user._id), 1);

        await user.save();
        await friendToRemove.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(user);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET pending friends of user.
router.get("/:userID/pendingFriends", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        return res
            .send(user.pendingFriends);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to add a friend request to a user's pendingFriends array.
router.put("/:userID/addPendingFriend/:friendID", [auth], async (req, res) => {
    try {
        let friendToAdd = await User.findById(req.params.friendID);
        if (!friendToAdd)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        if (user.pendingFriends.includes(friendToAdd._id))
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.friendID} already a friend.`);

        user.pendingFriends.push(friendToAdd);
        await user.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(user);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to remove a friend request from a user's pendingFriends array.
router.put("/:userID/removePendingFriend/:friendID", [auth], async (req, res) => {
    try {
        let friendToRemove = await User.findById(req.params.friendID);
        if (!friendToRemove)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        const newArray = user.friends.filter(friend => friend != friendToRemove);
        user.pendingFriends = newArray;
        await user.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(user);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;
