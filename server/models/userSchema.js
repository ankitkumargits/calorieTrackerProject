const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    weight:String,
    height:String,
    gender:String,
    age:String,
    bmr:String
})

const User = mongoose.model("user", userSchema);

module.exports = User;