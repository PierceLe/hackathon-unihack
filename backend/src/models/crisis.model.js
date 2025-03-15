const mongoose = require('mongoose');

const crisisSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  role_needed: { type: String, required: true },
  effect: [{ type: Number }],
  resolution: { type: String, required: true },
});

const Crisis = mongoose.model('Crisis', crisisSchema);
module.exports = Crisis;
