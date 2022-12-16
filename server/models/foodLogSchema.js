const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    ID: String,
    name: String,
    FoodGroup: String,
    Calories: String,
    Fat: String,
    Protein: String,
    Carbohydrate: String,
    ServingDescription: String
});

const FoodLog = mongoose.model("foodlog", foodSchema);

module.exports = FoodLog;
