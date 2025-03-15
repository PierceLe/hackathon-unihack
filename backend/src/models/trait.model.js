const mongoose = require('mongoose');

const traitSchema = mongoose.Schema({
  hidden: { type: Boolean, default: false },
  description: { type: String, required: true },
  effect: [{ type: Number }],
});

const Trait = mongoose.model('Trait', traitSchema);
module.exports = Trait;
