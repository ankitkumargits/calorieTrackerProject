const mongoose = require('mongoose');

const actLogSchema = new mongoose.Schema({
  ACTIVITY: String,
  SPECIFICMOTION: String,
  METs: String
})

const ActivityLog = mongoose.model("ActivityLog", actLogSchema);

module.exports = ActivityLog