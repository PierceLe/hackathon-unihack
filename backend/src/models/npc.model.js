const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const npcSchema = mongoose.Schema({
  model_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
  traits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trait' }],
  skills: [{ type: Number }],
  max_stamina: { type: Number, required: true },
  max_mood: { type: Number, required: true },
  image: { type: String },
});

npcSchema.plugin(toJSON);
npcSchema.plugin(paginate);

const NPC = mongoose.model('NPC', npcSchema);
module.exports = NPC;
