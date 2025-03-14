const mongoose = require('mongoose');

const traitSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  hidden: { type: Boolean, required: true },
  description: { type: String, required: true },
  effect: { type: [Number], validate: v => v.length === 6 },
  activation_condition: { type: String, required: true },
});

const Trait = mongoose.model('Trait', traitSchema);

module.exports = Trait;
