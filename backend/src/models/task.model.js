const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["Backend", "Frontend", "Special", "Pitch"],
    required: true,
  },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  tsp: { type: Number, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
