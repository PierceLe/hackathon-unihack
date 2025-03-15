const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGameState = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    user_id: Joi.string().custom(objectId).required(),
    npc_state: Joi.array().items(Joi.string().custom(objectId)),
    stage: Joi.number().required(),
    tasks: Joi.array().items(Joi.string().custom(objectId)),
    chat_log: Joi.string().required(),
    crises: Joi.array().items(Joi.string().custom(objectId)),
    judge_score: Joi.number().required(),
  }),
};

const getGameStates = {
  query: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    stage: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGameState = {
  params: Joi.object().keys({
    gameStateId: Joi.string().custom(objectId),
  }),
};

const updateGameState = {
  params: Joi.object().keys({
    gameStateId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      stage: Joi.number(),
      chat_log: Joi.string(),
      judge_score: Joi.number(),
      npc_state: Joi.array().items(Joi.string().custom(objectId)),
      tasks: Joi.array().items(Joi.string().custom(objectId)),
      crises: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const deleteGameState = {
  params: Joi.object().keys({
    gameStateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createGameState,
  getGameStates,
  getGameState,
  updateGameState,
  deleteGameState,
};
