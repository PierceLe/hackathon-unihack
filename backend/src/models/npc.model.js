const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const npcSchema = mongoose.Schema(
  {
    model_id: { type: String, required: true, index: true }, // Thêm index
    name: { type: String, required: true, index: true }, // Thêm index để tìm kiếm nhanh hơn
    age: { type: Number, required: true },
    role: { type: String, required: true },
    traits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trait' }],
    skills: [{ type: Number }],
    max_stamina: { type: Number, required: true },
    max_mood: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

npcSchema.plugin(toJSON);
npcSchema.plugin(paginate);

/**
 * Kiểm tra xem NPC đã tồn tại chưa theo `model_id`
 * @param {string} modelId - ID của NPC model
 * @param {ObjectId} [excludeNpcId] - ID cần loại trừ (nếu có)
 * @returns {Promise<boolean>}
 */
npcSchema.statics.isModelIdTaken = async function (modelId, excludeNpcId) {
  const npc = await this.findOne({ model_id: modelId, _id: { $ne: excludeNpcId } });
  return !!npc;
};

/**
 * @typedef NPC
 */
const NPC = mongoose.model('NPC', npcSchema);
module.exports = NPC;
