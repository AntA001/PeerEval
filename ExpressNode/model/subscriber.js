const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new mongoose.Schema({
  subscribe_by: { type: Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model("subscriber", subscriberSchema);