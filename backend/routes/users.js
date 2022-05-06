const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();


//* POST register a new user
router.post("/register", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send(`Email ${req.body.email} already claimed!`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            isAdmin: req.body.isAdmin,
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
                isAdmin: user.isAdmin
            });
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send(`Invalid email or password.`);

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password.");

        const token = user.generateAuthToken();
        return res.send(token);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// Get all users
router.get("/", [auth], async (req, res) => {
    try {
        console.log(req.user);
        const users = await User.find();
        return res.send(users);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// Get one user by ID
router.get("/:userId", [auth], async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);

        if (!user)
            return res
                .status(400)
                .send(`User with id ${req.params.userId} does not exist!`);

        console.log(req.user);
        return res
            .status(200)
            .send(user);
    } catch (ex) {
        return res
            .status(500)
            .send(`Internal Server Error: ${ex}`);
    }
});

// Put update user by ID
router.put("/:userId", [auth], async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error)
            return res
                .status(400)
                .send(`Body for user not valid! ${error}`);

        let user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userId} does not exist.`);
        
        return res
            .status(200)
            .send(user);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// Put add friend user's friend array.
router.put("/:userId/friends/:friendId", [auth], async (req, res) => {
    try {
        let friend = await User.findById(req.params.friendId);
        if (!friend)
            return res
                .status(400)
                .send(`Friend with ObjectId ${req.params.friendId} does not exist.`);

        let user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user)
            return res
                .status(400)
                .send(`User with ObjectId ${req.params.userId} does not exist.`);

        user.friends.push(friend._id);
        await user.save();

        return res
            .status(200)
            .send(user);
    } catch (error) {
        return res
            .status(500)
            .send(`Internal Server Error: ${error}`);
    }
});

// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user)
            return res
                .status(400)
                .send(`User with id ${req.params.userId} does not exist!`);
        await user.remove();
        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;
