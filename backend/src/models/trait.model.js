const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const traitSchema = mongoose.Schema(
  {
    hidden: { type: Boolean, default: false },
    description: { type: String, required: true },
    effect: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

// Thêm plugin hỗ trợ JSON và phân trang
traitSchema.plugin(toJSON);
traitSchema.plugin(paginate);

/**
 * @typedef Trait
 */
const Trait = mongoose.model('Trait', traitSchema);
module.exports = Trait;
