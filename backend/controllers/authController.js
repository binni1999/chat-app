const { profile } = require("console");
const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const generateTokenAndSetCookies = require("../utils/generateToken");
exports.signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords Don't match" })

        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User Already Exists" })
        }
        //Hash Password here
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //generate JWT token here
            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic

            })
        } else {
            res.status(400).json({ error: 'Invalid user data ' })
        }


    } catch (error) {
        console.log('Error in signup controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }


}
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic

        })

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully" })
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

