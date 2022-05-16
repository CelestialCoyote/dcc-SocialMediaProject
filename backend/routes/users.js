const { User, validateLogin, validateUser } = require("../models/user");
const fileUpload = require("../middleware/file_upload");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();


// POST register a new user
router.post("/register",  async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error)
            return res
                .status(400)
                .send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(400)
                .send(`Email ${req.body.email} already claimed!`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            isAdmin: req.body.isAdmin,
            // image: req.file.path
        });
        await user.save();

        const token = user.generateAuthToken();

        return res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send({
                _id: user._id, 
                name: user.name,
                email: user.email, 
                isAdmin: user.isAdmin,
                image: user.image,
                posts: user.posts,
                friends: user.freinds,
                pendingFriends: user.pendingFriends
            });
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error)
            return res
                .status(400)
                .send('val', error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .send(`Invalid email or password.`);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res
                .status(400)
                .send("Invalid email or Password.");

        const token = user.generateAuthToken();
        return res
            .send(token);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET all users.
router.get("/", [auth], async (req, res) => {
    try {
        const users = await User.find();

        return res
            .send(users);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// GET a single user by ID.
router.get("/:userID/getOneUser", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with id ${req.params.userID} does not exist!`);
        await User.findById();

        return res
            .status(200)
            .send(user);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// PUT to update user information by ID.
router.put("/:userID/updateUser", [auth, fileUpload.single("image")], async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for user not valid! ${error}`);

        let user = await User.findByIdAndUpdate(
            req.params.userID,
        {...req.body, /*image: req.file.path*/ },
            { new: true, }
        );
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userID} does not exist.`);

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

        user.friends.push(friendToAdd._id);
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

        const newArray = user.friends.filter(friend => friend != friendToRemove.id);
        user.friends = newArray;
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

// DELETE a single user from the database.
router.delete("/:userID", [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        if (!user)
            return res
                .status(400)
                .send(`User with id ${req.params.userID} does not exist!`);
        await user.remove();

        const token = user.generateAuthToken(); // Add to any route where user should be updated

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
