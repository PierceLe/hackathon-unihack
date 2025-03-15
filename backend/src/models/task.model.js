const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: false },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  path: { type: String, required: false },
  tsp: { type: Number, required: false },
  spLeft: { type: Number, required: false },
  spPredicted: { type: Number, required: false },
  status: { type: String, enum: ['todo', 'inprogress', 'testing', 'done'], default: 'todo' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: false },
  modelId: { type: String, required: false },
}, {
  timestamps: true
});

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
