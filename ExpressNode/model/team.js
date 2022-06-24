const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  name: { type: String, default: null },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  student_ids: { type: Array, default: [] },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model("team", teamSchema);