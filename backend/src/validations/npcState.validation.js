const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNPCState = {
  body: Joi.object().keys({
    npc_id: Joi.string().custom(objectId).required(),
    current_stamina: Joi.number().required(),
    current_mood: Joi.number().required(),
  }),
};

const getNPCStates = {
  query: Joi.object().keys({
    npc_id: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNPCState = {
  params: Joi.object().keys({
    npcStateId: Joi.string().custom(objectId),
  }),
};

const updateNPCState = {
  params: Joi.object().keys({
    npcStateId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    current_stamina: Joi.number(),
    current_mood: Joi.number(),
  }).min(1),
};

const deleteNPCState = {
  params: Joi.object().keys({
    npcStateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNPCState,
  getNPCStates,
  getNPCState,
  updateNPCState,
  deleteNPCState,
};
