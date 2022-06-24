const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new mongoose.Schema({
  name: { type: String, default: null },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
  expire_at: { type: Date, default: null },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});
formSchema.virtual('status', {
    ref: 'review',
    localField: '_id',
    foreignField: 'form_id',
    count: true
})

formSchema.virtual('isValidToDeclare', {
    ref: 'lacreview',
    localField: '_id',
    foreignField: 'form_id',
    count: true
})

module.exports = mongoose.model("form", formSchema);