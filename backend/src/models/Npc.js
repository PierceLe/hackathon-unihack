const npcSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 99 },
    role: {
        type: String,
        enum: ["Backend Developer", "Frontend Developer", "Specialist", "Pitcher"],
        required: true
    },
    traits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trait' }], // References Trait IDs
    skills: {
        type: [Number],
        validate: [arrayLimit, '{PATH} must contain exactly 4 numbers'],
        required: true
    },
    max_stamina: { type: Number, required: true, min: 0 },
    max_mood: { type: Number, required: true, min: 0 },
    image: { type: String, match: /^https?:\/\// }
});

// Custom validator for skill array length
function arrayLimit(val) {
    return val.length === 4;
}

const Npc = mongoose.model('Npc', npcSchema);

module.exports = Npc;