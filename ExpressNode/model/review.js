const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  review_by: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews: { type: Array, default: [] },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
  form_id: { type: Schema.Types.ObjectId, ref: 'Form' },
  rating: { type: Number, default: 0 },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model("review", reviewSchema);