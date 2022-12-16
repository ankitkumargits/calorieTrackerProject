const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./db/conn");
const app = express();

connectToMongo();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api",require("./routes/api"));

app.listen(5000, ()=> {
    console.log("Your server is running on port 5000");
});