// const URL = mongodb+srv://srivensairishii:Rishi@12345@cluster0.kpv2wbq.mongodb.net/SUHRD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId= Schema.ObjectId;

const User= new Schema({
    username: {type: String, unique: true},
    password: String,
    location: String,
    MobileNO: String
});
const Admin= new Schema({
    usernname: {type: String, unique: true},
    password: String
});
const UserModel= mongoose.model('users',User)
const AdminModel= mongoose.model('admin',Admin)

module.exports= {
    UserModel:UserModel,
    AdminModel:AdminModel,
}   