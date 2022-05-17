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
            $and: [
                { '_id': { $nin: user.friends } },
                { '_id': { $ne: req.params.userID } },
                { '_id': { $nin: user.friendReqReceived } },
                { '_id': { $nin: user.friendReqSent } }
            ]
        });

        return res
            .status(200)
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
            .status(200)
            .send(friends);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET all current user friend requests received.
router.get("/:userID/allFriendRequestsReceived", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let requestsReceived = await User.find({
            '_id': { $in: user.friendReqReceived }
        });

        return res
            .status(200)
            .send(requestsReceived);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET all current user friend requests sent.
router.get("/:userID/allFriendRequestsSent", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        let requestsSent = await User.find({
            '_id': { $in: user.friendReqSent }
        });

        return res
            .status(200)
            .send(requestsSent);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT: Send a friend request from 'People You May Know array'.
// Add current user to potential friend's friendReqReceived array.
router.put("/:userID/sendFriendRequest/:friendID", [auth], async (req, res) => {
    try {
        let friendRequest = await User.findById(req.params.friendID);
        if (!friendRequest)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        if (user.friends.includes(friendRequest._id))
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.friendID} already a friend.`);

        user.friendReqSent.push(friendRequest);
        friendRequest.friendReqReceived.push(user);

        await user.save();
        await friendRequest.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send([user, friendRequest]);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT: Accept friend request from friendReqReceived array.
// Add current user and requestot to each others friends array.
router.put("/:userID/acceptFriendRequest/:friendID", [auth], async (req, res) => {
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

        user.friends.push(friendToAdd);
        user.friendReqReceived.splice(user.friendReqReceived.indexOf(friendToAdd._id), 1);
        friendToAdd.friends.push(user);
        friendToAdd.friendReqSent.splice(friendToAdd.friendReqSent.indexOf(user._id), 1);

        await user.save();
        await friendToAdd.save();

        const token = user.generateAuthToken();

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

// PUT: Decline friend request from friendReqReceived array.
// Remove current user from requestor's friendReqSent array,
// and remove requestor from current user's friendReqReceived array.
router.put("/:userID/declineFriendRequest/:friendID", [auth], async (req, res) => {
    try {
        let friendToDecline = await User.findById(req.params.friendID);
        if (!friendToDecline)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendID} does not exist.`);

        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

        if (user.friends.includes(friendToDecline._id))
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.friendID} already a friend.`);

        user.friendReqReceived.splice(user.friendReqReceived.indexOf(friendToDecline._id), 1);
        friendToDecline.friendReqSent.splice(friendToDecline.friendReqSent.indexOf(user._id), 1);

        await user.save();
        await friendToDecline.save();

        const token = user.generateAuthToken();

        return res
            .status(200)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send([user, friendToDecline]);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to remove a friend from a user's friends array.
router.put("/:userID/friendToDelete/:friendID", [auth], async (req, res) => {
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

        user.pendingFriends.splice(user.pendingFriends.indexOf(friendToRemove._id), 1);
        friendToRemove.pendingFriends.splice(friendToRemove.pendingFriends.indexOf(user._id), 1);

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


module.exports = router;
