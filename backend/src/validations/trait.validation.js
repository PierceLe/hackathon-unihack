const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTrait = {
  body: Joi.object().keys({
    hidden: Joi.boolean(),
    description: Joi.string().required(),
    effect: Joi.array().items(Joi.number()),
  }),
};

const getTraits = {
  query: Joi.object().keys({
    hidden: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTrait = {
  params: Joi.object().keys({
    traitId: Joi.string().custom(objectId),
  }),
};

const updateTrait = {
  params: Joi.object().keys({
    traitId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    hidden: Joi.boolean(),
    description: Joi.string(),
    effect: Joi.array().items(Joi.number()),
  }).min(1),
};

const deleteTrait = {
  params: Joi.object().keys({
    traitId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTrait,
  getTraits,
  getTrait,
  updateTrait,
  deleteTrait,
};
