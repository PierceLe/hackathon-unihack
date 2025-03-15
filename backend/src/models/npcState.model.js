const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const npcStateSchema = mongoose.Schema({
  npc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: true },
  current_stamina: { type: Number, required: true },
  current_mood: { type: Number, required: true },
});

npcStateSchema.plugin(toJSON);
npcStateSchema.plugin(paginate);

const NPCState = mongoose.model('NPCState', npcStateSchema);
module.exports = NPCState;
