const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCrisis = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    role_needed: Joi.string().required(),
    effect: Joi.array().items(Joi.number()),
    resolution: Joi.string().required(),
  }),
};

const getCrises = {
  query: Joi.object().keys({
    name: Joi.string(),
    role_needed: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCrisis = {
  params: Joi.object().keys({
    crisisId: Joi.string().custom(objectId),
  }),
};

const updateCrisis = {
  params: Joi.object().keys({
    crisisId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      role_needed: Joi.string(),
      effect: Joi.array().items(Joi.number()),
      resolution: Joi.string(),
    })
    .min(1),
};

const deleteCrisis = {
  params: Joi.object().keys({
    crisisId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCrisis,
  getCrises,
  getCrisis,
  updateCrisis,
  deleteCrisis,
};
