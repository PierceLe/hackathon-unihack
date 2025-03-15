const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCrisisState = {
  body: Joi.object().keys({
    crisis_id: Joi.string().custom(objectId).required(),
    status: Joi.string().valid('active', 'resolved', 'failed').required(),
    turn_left: Joi.number().integer().required(),
  }),
};

const getCrisisStates = {
  query: Joi.object().keys({
    status: Joi.string().valid('active', 'resolved', 'failed'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCrisisState = {
  params: Joi.object().keys({
    crisisStateId: Joi.string().custom(objectId),
  }),
};

const updateCrisisState = {
  params: Joi.object().keys({
    crisisStateId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().valid('active', 'resolved', 'failed'),
      turn_left: Joi.number().integer(),
    })
    .min(1),
};

const deleteCrisisState = {
  params: Joi.object().keys({
    crisisStateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCrisisState,
  getCrisisStates,
  getCrisisState,
  updateCrisisState,
  deleteCrisisState,
};
