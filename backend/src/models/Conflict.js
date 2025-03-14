const mongoose = require('mongoose');

// Define Conflict Schema
const conflictSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        description: "Unique conflict identifier (e.g., 'conflict001')"
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        description: "Descriptive conflict name"
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        description: "Detailed explanation of the conflict's effect"
    },
    effect: {
        type: [Number],
        validate: {
            validator: function (val) {
                return val.length === 6;
            },
            message: 'Effect array must contain exactly 6 integers'
        },
        required: true,
        description: "Effect array with exactly 6 integer values"
    },
    activation_condition: {
        type: String,
        required: true,
        description: "Condition that triggers the conflict's effect"
    }
});

// Index for improved lookup performance
conflictSchema.index({ id: 1 }, { unique: true });

// Create and export Conflict model
const Conflict = mongoose.model('Conflict', conflictSchema);

module.exports = Conflict;
