const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  train: { type: Schema.Types.ObjectId, ref: 'train' },
  coach_type: { type: String },
  journey_date: { type: Date },
  status: { type: String, status: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  payment: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model('book', bookingSchema);
