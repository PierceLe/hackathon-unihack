const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chatLogSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  npc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: false },
  message_content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

chatLogSchema.plugin(toJSON);
chatLogSchema.plugin(paginate);

const ChatLog = mongoose.model('ChatLog', chatLogSchema);
module.exports = ChatLog;
