const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const crisisSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    effect: {
      type: [Number],
      validate: (v) => v.length === 6,
    },
    activation_condition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
crisisSchema.plugin(toJSON);
crisisSchema.plugin(paginate);

/**
 * @typedef Crisis
 */
const Crisis = mongoose.model('Crisis', crisisSchema);

module.exports = Crisis;
