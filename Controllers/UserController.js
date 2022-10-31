const UserModel = require('../Models/UserModel');
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const accessToken = jwt.sign(req.body, process.env.TOKEN, { expiresIn: "1h" });
        const result = await newUser.save();
        const { username, email } = result;
        res.send({ success: true, message: "Successfully created user", token: accessToken, result: { username, email } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json({ success: true, message: "User fetched successfully", result:user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.getSingleUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (user) {
            const { username, email } = user;
            if (user.password === password) {
                const accessToken = jwt.sign(req.body, process.env.TOKEN, { expiresIn: "1h" });
                res.status(200).json({ success: true, message: "Login successfully", token: accessToken, result: { username, email } });
            } else {
                res.status(401).json({ success: false, message: "Invalid password" });
            }
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
}