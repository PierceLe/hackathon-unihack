const mongoose = require('mongoose');

const npcStateSchema = mongoose.Schema({
  npc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: true },
  current_stamina: { type: Number, required: true },
  current_mood: { type: Number, required: true },
});

const NPCState = mongoose.model('NPCState', npcStateSchema);
module.exports = NPCState;
