const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  train: { type: Schema.Types.ObjectId, ref: 'train' },
  coach_type: { type: String },
  journey_date: { type: Date },
  status: { type: String, status: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
  payment: { type: Number, default: 0 },
}, { timestamps: true });


module.exports = mongoose.model('book', bookingSchema);
