const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const auth = require("../Middleware/auth");
const { AdminModel, VideosModel, NewsModel, AssessmentsModel } = require("../Models/AdminModel");

adminRouter.post("/adminsignup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        let admin = await AdminModel.findOne({ username });
        if (admin) return res.status(400).json({ msg: "Admin already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModel({ username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({
             msg: "Admin registered successfully" ,
             admin: { id: newAdmin._id, username: newAdmin.username, location: newAdmin.location }   
            });
    }
     catch (err) {
        res.status(500).json({ error: err.message });
    }
});

adminRouter.post("/adminvideo", auth, async (req, res) => {
    const { title, description, videoUrl, videoThumbnail, status } = req.body;
    if (!title || !description || !videoUrl || !videoThumbnail || status === undefined) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const newVideo = new VideosModel({ title, description, videoUrl, videoThumbnail, status });
        await newVideo.save();
        res.status(201).json({ msg: "Video added successfully", ...newVideo.toObject() });
    } catch (err) {
        console.error("Error adding video:", err);
        res.status(500).json({ error: "Server error while adding video" });
    }
});

adminRouter.post("/adminnews", auth, async (req, res) => {
    const { title, description,imageUrl, status } = req.body;
    if (!title || !description || !imageUrl || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const newNews = new NewsModel({ title, description, imageUrl, status });
        await newNews.save();
        res.status(201).json({ msg: "News added successfully", news: newNews });
    } catch (err) {
        console.error("Error adding news:", err);
        res.status(500).json({ error: "Server error while adding news" });
    }
});

adminRouter.post("/adminassessments", auth , async (req, res) => {
    const { title, description, link, status } = req.body;
    if (!title || !description || !link || !status) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        const newAssessment = new AssessmentsModel({ title, description, link, status });
        await newAssessment.save();
        res.status(201).json({ msg: "Assessment added successfully", assessment: newAssessment });
    } catch (err) {
        console.error("Error adding assessment:", err);
        res.status(500).json({ error: "Server error while adding assessment" });
    }
});

adminRouter.post("/adminlogin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ username });
        if (!admin) return res.status(400).json({ msg: "Invalid credentials" });
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ 
            msg: "Login successful",
            token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

adminRouter.put("/video/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const { title, description,videoUrl,videoThumbnail,status } = req.body;
        console.log(req)
        const video = await VideosModel.findById(id);
        console.log(video);
        if (!video) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (title) {
            video.title = title;
        }
        if (description) {
            video.description = description;
        }
        if (videoUrl) {
            video.videoUrl = videoUrl;
        }
        if (videoThumbnail) {
            video.videoThumbnail = videoThumbnail;
        }
        if (status) {
            video.status = status;
        }
        await video.save();

        res.status(200).json({ message: "Course updated successfully",video: video });
});

adminRouter.put("/news/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const { title, description,imageUrl,status } = req.body;
        console.log(req)
        const news = await NewsModel.findById(id);
        console.log(news);
        if (!news) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (title) {
            news.title = title;
        }
        if (description) {
            news.description = description;
        }
        if (imageUrl) {
            news.imageUrl = imageUrl;
        }
        if (status) {
            news.status = status;
        }
        await news.save();

        res.status(200).json({ message: "Course updated successfully",news: news });
});

adminRouter.put("/assessments/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const { title, description,link,status } = req.body;
        console.log(req)
        const assessments = await AssessmentsModel.findById(id);
        console.log(assessments);
        if (!assessments) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (title) {
            assessments.title = title;
        }
        if (description) {
            assessments.description = description;
        }
        if (link) {
            assessments.link = link;
        }
        if (status) {
            assessments.status = status;
        }
        await assessments.save();

        res.status(200).json({ message: "Course updated successfully",assessments: assessments });
});


adminRouter.delete("/video/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const video = await VideosModel.findByIdAndDelete(id);
        if (!video) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
})


adminRouter.delete("/news/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const news = await NewsModel.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
})

adminRouter.delete("/assessments/:id", auth, async(req, res) => {
        const id  = req.params.id;
        const assessments = await AssessmentsModel.findByIdAndDelete(id);
        if (!assessments) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
})



module.exports = {adminRouter};

