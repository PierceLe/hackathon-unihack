const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const crisisSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  role_needed: { type: String, required: true },
  effect: [{ type: Number }],
  resolution: { type: String, required: true },
});

crisisSchema.plugin(toJSON);
crisisSchema.plugin(paginate);

const Crisis = mongoose.model('Crisis', crisisSchema);
module.exports = Crisis;
