const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    userId:String,
    date: String,
    foodName: String,
    mealType: String,
    foodGroup: String,
    calories: String,
    servingDesc: String
});

const Food = mongoose.model('food', foodSchema);

module.exports = Food;