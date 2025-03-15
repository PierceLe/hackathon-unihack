const mongoose = require('mongoose');

const npcSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  model_id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: {
    type: String,
    enum: ["Backend Developer", "Frontend Developer", "Specialist", "Pitcher"],
    required: true,
  },
  traits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trait' }], // References Trait model
  skills: { type: [Number], validate: v => v.length === 4 },
  max_stamina: { type: Number, required: true },
  max_mood: { type: Number, required: true },
  image: { type: String, match: /^https?:\/\// },
});

const Npc = mongoose.model('Npc', npcSchema);

module.exports = Npc;
