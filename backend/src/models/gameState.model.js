const mongoose = require('mongoose');

const gameStateSchema = mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    npc_state: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NpcState' }],
    stage: { type: Number, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskState' }],
    chat_log: { type: String, required: true },
    crises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crisis' }],
    judge_score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;
