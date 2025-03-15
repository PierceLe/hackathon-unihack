const mongoose = require('mongoose');

const taskStateSchema = mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  sp_left: { type: Number, required: true },
  sp_predicted: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], required: true },
});

const TaskState = mongoose.model('TaskState', taskStateSchema);
module.exports = TaskState;
