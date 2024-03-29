const UserModel = require('../Models/UserModel');
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const accessToken = jwt.sign(req.body.email, process.env.TOKEN, { expiresIn: "1h" });
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
        res.status(200).json({ success: true, message: "User fetched successfully", result: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.excludeCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.find({ _id: { $ne: req.params.userId } });
        res.status(200).json({ success: true, message: "User fetched successfully", result: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { username_or_email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ username: username_or_email }, { email: username_or_email }] });
        if (!user) {
            throw new Error(400, 'User not found');
        }

        const storedPassword = user?.password;
        const passwordMatch = storedPassword === password;

        if (!passwordMatch) {
            throw new Error(400, 'Invalid password');
        }

        if (user) {
            const { username, email } = user;
            const accessToken = jwt.sign({ email }, process.env.TOKEN, { expiresIn: "1d" });

            res.status(200).json({ success: true, message: "Login successfully", token: accessToken, result: { username, email } });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};

module.exports.loggedInUser = async (req, res) => {
    try {
        const authorizationHeader = await req.headers.authorization;

        if (!authorizationHeader) {
            res.status(401).json({ success: false, message: "Authorization header missing" });
            return;
        }

        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN);
        const user = await UserModel.findOne({ email: decoded.email }).select({ password: 0, _v: 0 });
        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json({ success: true, message: "User fetched successfully", result: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};
