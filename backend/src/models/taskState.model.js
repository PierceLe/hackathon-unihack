const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskStateSchema = mongoose.Schema(
  {
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true, index: true },
    sp_left: { type: Number, required: true },
    sp_predicted: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'testing', 'completed'], required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'NPC', required: true },
  },
  { timestamps: true }
);

// Thêm plugin hỗ trợ JSON và phân trang
taskStateSchema.plugin(toJSON);
taskStateSchema.plugin(paginate);

/**
 * @typedef TaskState
 */
const TaskState = mongoose.model('TaskState', taskStateSchema);
module.exports = TaskState;
