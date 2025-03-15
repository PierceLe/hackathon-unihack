const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  tsp: { type: Number, required: true },
  path: { type: String, required: true },
});

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
