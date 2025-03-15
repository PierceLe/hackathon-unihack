const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const traitSchema = mongoose.Schema({
  hidden: { type: Boolean, default: false },
  description: { type: String, required: true },
  effect: [{ type: Number }],
});

traitSchema.plugin(toJSON);
traitSchema.plugin(paginate);

const Trait = mongoose.model('Trait', traitSchema);
module.exports = Trait;
