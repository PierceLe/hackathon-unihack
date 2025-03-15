const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const npcStateSchema = mongoose.Schema(
  {
    npc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: true, index: true },
    current_stamina: { type: Number, required: true },
    current_mood: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Thêm plugin hỗ trợ JSON và phân trang
npcStateSchema.plugin(toJSON);
npcStateSchema.plugin(paginate);

/**
 * @typedef NPCState
 */
const NPCState = mongoose.model('NPCState', npcStateSchema);
module.exports = NPCState;
