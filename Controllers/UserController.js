const UserModel = require('../Models/UserModel');

module.exports.createUser = async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const result = await newUser.save();
        res.status(200).json({ success: true, message: "User created successfully", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", err });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json({ success: true, message: "User fetched successfully", user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", err });
    }
};