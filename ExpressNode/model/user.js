const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  reset_password_code: { type: String , default: null},
  token: { type: String },
  pictures: { type: String, default: null },
  role: { type: String, default: null },
  university: { type: String, default: null },
  registration_number: { type: String, default: null },
  is_verify: { type: Boolean, default: false },
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

userSchema.virtual('teamDetail', {
    ref: 'team',
    localField: '_id',
    foreignField: 'student_ids'
})

userSchema.virtual('status', {
    ref: 'review',
    localField: '_id',
    foreignField: 'review_by',
    count: true
})

userSchema.virtual('reviewOnForm', {
    ref: 'review',
    localField: '_id',
    foreignField: 'review_by',
    count: true
})

module.exports = mongoose.model("user", userSchema);