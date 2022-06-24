const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  name: { type: String, default: null },
  course_key: { type: String, unique: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

courseSchema.virtual('formCount', {
    ref: 'form',
    localField: '_id',
    foreignField: 'course_id',
    count: true
})

module.exports = mongoose.model("course", courseSchema);