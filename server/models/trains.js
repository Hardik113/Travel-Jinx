const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, unique: true },
  type: { type: String, required: true, enum: ['Diesel', 'Electrical'] },
  description: { type: String },
  start: { type: String },
  destination: { type: String },
  time: {
    arrival: { type: String },
    departure: { type: String },
  },
  seats_available: { type: Number, default: 100 },
  coach_types: [{ type: String, enum:['CC', '2AC', '3AC', 'SL']}],
  cost: {
    cc: { type: Number },
    second_ac: { type: Number },
    three_ac: { type: Number },
    sleeper: { type: Number },
  }
  }, { timestamps: true });


module.exports = mongoose.model('train', trainSchema);
