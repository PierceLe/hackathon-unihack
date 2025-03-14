const mongoose = require('mongoose');

// Define Trait Schema
const traitSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        description: "Unique trait identifier (e.g., 'trait001')"
    },
    hidden: {
        type: Boolean,
        required: true,
        description: "Indicates if the trait is hidden or visible"
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        description: "Detailed explanation of the trait's purpose"
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
        description: "Effect array with exactly 6 integer values",
    },
    activation_condition: {
        type: String,
        required: true,
        description: "Condition that triggers the trait's effect"
    }
});

// Index for improved lookup performance
traitSchema.index({ id: 1 }, { unique: true });

// Create and export Trait model
const Trait = mongoose.model('Trait', traitSchema);

module.exports = Trait;

