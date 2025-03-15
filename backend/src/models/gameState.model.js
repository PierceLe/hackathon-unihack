const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const gameStateSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  npc_state: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NPCState' }],
  stage: { type: Number, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskState' }],
  chat_log: { type: String },
  crises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CrisisState' }],
  judge_score: { type: Number, required: true },
  turn_before_next_stage: { type: Number, required: true },
  time_stamp: { type: Date, default: Date.now },
});

gameStateSchema.plugin(toJSON);
gameStateSchema.plugin(paginate);

const GameState = mongoose.model('GameState', gameStateSchema);
module.exports = GameState;
