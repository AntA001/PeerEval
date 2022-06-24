const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lacreviewSchema = new mongoose.Schema({
  review_by: { type: Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
  form_id: { type: Schema.Types.ObjectId, ref: 'Form' },
  team_rating: { type: Number, default: 0 },
  team_final: { type: Number, default: 0 },
  students_final: { type: Array, default: [] },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model("lacreview", lacreviewSchema);