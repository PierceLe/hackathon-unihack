const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNPC = {
  body: Joi.object().keys({
    model_id: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
    traits: Joi.array().items(Joi.string().custom(objectId)),
    skills: Joi.array().items(Joi.number()),
    max_stamina: Joi.number().required(),
    max_mood: Joi.number().required(),
    image: Joi.string(),
  }),
};

const getNPCs = {
  query: Joi.object().keys({
    model_id: Joi.string(),
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getNPC = {
  params: Joi.object().keys({
    npcId: Joi.string().custom(objectId),
  }),
};

const updateNPC = {
  params: Joi.object().keys({
    npcId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    age: Joi.number(),
    role: Joi.string(),
    traits: Joi.array().items(Joi.string().custom(objectId)),
    skills: Joi.array().items(Joi.number()),
    max_stamina: Joi.number(),
    max_mood: Joi.number(),
    image: Joi.string(),
  }).min(1),
};

const deleteNPC = {
  params: Joi.object().keys({
    npcId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNPC,
  getNPCs,
  getNPC,
  updateNPC,
  deleteNPC,
};
