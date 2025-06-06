const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    MobileNO: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    next();
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
