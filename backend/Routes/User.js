const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { VideosModel, NewsModel, AssessmentsModel } = require("../Models/AdminModel");
const auth = require("../Middleware/auth");
const userRouter = express.Router();

userRouter.post("/usersignup", async (req, res) => {
    const { username, password, location, MobileNO } = req.body;
    if (!username || !password || !location || !MobileNO) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const existingUser = await UserModel.findOne({ $or: [{ username }, { MobileNO }]});
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this username or mobile number" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ username, password: hashedPassword, location, MobileNO });
        res.status(201).json({
            msg: "User registered successfully",    
            user: { id: newUser._id, username: newUser.username, location: newUser.location }   
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ 
            error: "Server error during registration",
            details: err.message 
        });
    }
});

userRouter.post("/userlogin", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: "1d" });
        res.json({
            message: "Login successful",
            token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ 
            error: "Server error during login",
            details: err.message 
        });
    }
});

userRouter.get("/video", async (req, res) => {
    try {
        const videos = await VideosModel.find({}).select("title description videoUrl videoThumbnail status createdAt");
        res.json(videos);
    } catch (err) {
        console.error("Error fetching videos:", err);
        res.status(500).json({ error: "Server error while fetching videos" });
    }
});

userRouter.get("/news", async (req, res) => {
    try {
        const news = await NewsModel.find({}).select("title description imageUrl status createdAt");
        res.json(news);
    } catch (err) {
        console.error("Error fetching news:", err);
        res.status(500).json({ error: "Server error while fetching news" });
    }
});

userRouter.get("/assessments", async (req, res) => {
    try {
        const assessments = await AssessmentsModel.find({}).select("title description link status createdAt");
        res.json(assessments);
    } catch (err) {
        console.error("Error fetching assessments:", err);
        res.status(500).json({ error: "Server error while fetching assessments" });
    }
});

module.exports = { userRouter };