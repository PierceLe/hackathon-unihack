const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const crisisStateSchema = mongoose.Schema(
  {
    crisis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Crisis', required: true },
    status: { type: String, enum: ['active', 'resolved', 'failed'], required: true },
    turn_left: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

crisisStateSchema.plugin(toJSON);
crisisStateSchema.plugin(paginate);

/**
 * @typedef CrisisState
 */
const CrisisState = mongoose.model('CrisisState', crisisStateSchema);
module.exports = CrisisState;
