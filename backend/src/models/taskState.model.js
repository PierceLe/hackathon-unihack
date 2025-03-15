const mongoose = require('mongoose');

const taskStateSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  sp_left: { type: Number, required: true },
  sp_predicted: { type: Number, required: true },
  status: {
    type: String,
    enum: ["not started", "in progress", "done"],
    required: true,
  },
});

const TaskState = mongoose.model('TaskState', taskStateSchema);

module.exports = TaskState;
