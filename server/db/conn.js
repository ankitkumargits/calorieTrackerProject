const mongoose = require("mongoose");

const connectToMongo = () => {
    const dbUrl = "mongodb://127.0.0.1:27017/caltrackerdb";
    mongoose.set('strictQuery', true);
    mongoose.connect(dbUrl, ()=> {
        console.log("Your db is connected to the server");
    });
}

module.exports = connectToMongo;