const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const videosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    videoThumbnail: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


const assessmentsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});



const AdminModel = mongoose.model('Admin', adminSchema);
const VideosModel = mongoose.model('Videos', videosSchema);
const NewsModel = mongoose.model('News', newsSchema);
const AssessmentsModel = mongoose.model('Assessments', assessmentsSchema);

module.exports = {AdminModel , VideosModel  , NewsModel , AssessmentsModel};


