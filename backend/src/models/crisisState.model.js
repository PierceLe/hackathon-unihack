const mongoose = require('mongoose');

const crisisStateSchema = mongoose.Schema({
  crisis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Crisis', required: true },
  status: { type: String, enum: ['active', 'resolved', 'failed'], required: true },
  turn_left: { type: Number, required: true },
});

const CrisisState = mongoose.model('CrisisState', crisisStateSchema);
module.exports = CrisisState;
