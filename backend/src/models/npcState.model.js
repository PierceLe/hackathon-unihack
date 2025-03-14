const mongoose = require('mongoose');

const npcStateSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  npc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc', required: true },
  current_stamina: { type: Number, required: true },
  current_mood: { type: Number, required: true },
});

const NpcState = mongoose.model('NpcState', npcStateSchema);

module.exports = NpcState;
