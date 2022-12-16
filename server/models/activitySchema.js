const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  date: String,
  actName: String,
  actDesc: String,
  metValue: String,
  actDuration: String,
  userId: String
})

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;