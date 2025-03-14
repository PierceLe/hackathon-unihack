const mongoose = require('mongoose');

// Define Task Schema
const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        description: "Unique task identifier (e.g., 'task001')"
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        description: "Descriptive task name"
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        description: "Detailed explanation of the task's purpose"
    },
    dependencies: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        default: [],
        description: "List of dependent task IDs"
    },
    tsp: {
        type: Number,
        required: true,
        min: 1,
        description: "True Story Point value (minimum of 1)"
    }
});

// Index for improved lookup performance
taskSchema.index({ id: 1 }, { unique: true });

// Create and export Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;