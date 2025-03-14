const mongoose = require('mongoose');

// Define NPC State Schema (Nested Document)
const npcStateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        description: "NPC ID"
    },
    current_stamina: {
        type: Number,
        required: true,
        min: 0,
        description: "Current stamina value for NPC"
    },
    current_mood: {
        type: Number,
        required: true,
        min: 0,
        description: "Current stamina value for NPC"
    },
});

// Define Task Schema (Nested Document)
const taskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        required: true,
        description: "Task identifier"
    },
    status: {
        type: String,
        enum: ["not started", "in progress", "done"],
        required: true,
        description: "Current task progress status"
    }
});

// Define Crisis Schema (Nested Document)
const crisisSchema = new mongoose.Schema({
    crisis_id: {
        type: String,
        required: true,
        description: "Crisis identifier"
    },
    status: {
        type: String,
        enum: ["not started", "in progress", "done"],
        required: true,
        description: "Crisis progress status"
    }
});

// Define Game State Schema
const gameStateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        description: "Unique save identifier (e.g., 'save001')"
    },
    user_id: {
        type: String,
        required: true,
        description: "Identifier for the player"
    },
    npc_state: {
        type: [npcStateSchema],
        required: true,
        description: "Array of NPC states"
    },
    stage: {
        type: Number,
        required: true,
        min: 1,
        description: "Current game stage"
    },
    turns_left: {
        type: Number,
        required: true,
        min: 0,
        description: "Number of turns left before stage change"
    },
    tasks: {
        type: [taskSchema],
        required: true,
        description: "Array of task states"
    },
    chat_log: {
        type: String,
        required: true,
        description: "Text blob containing the entire chat log" // Path
    },
    crises: {
        type: [crisisSchema],
        required: true,
        description: "Array of crisis states"
    },
    judge_score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        description: "Score awarded by the judges"
    }
});

// Index for improved lookup performance
gameStateSchema.index({ save_id: 1 }, { unique: true });

// Create and export GameState model
const GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;
