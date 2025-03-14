const mongoose = require('mongoose');

const crisisSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  effect: { type: [Number], validate: v => v.length === 6 },
  activation_condition: { type: String, required: true },
});

const Crisis = mongoose.model('Crisis', crisisSchema);

module.exports = Crisis;
