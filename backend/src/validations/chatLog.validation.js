const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChatLog = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId).required(),
    npc_id: Joi.string().custom(objectId).optional(),
    message_content: Joi.string().required(),
  }),
};

const createManyChatLogs = {
  body: Joi.object().keys({
    chatLogs: Joi.array().items(
      Joi.object().keys({
        user_id: Joi.string().custom(objectId).required(),
        npc_id: Joi.string().custom(objectId).optional(),
        message_content: Joi.string().required(),
      })
    ).min(1),
  }),
};

const getChatLogs = {
  query: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    npc_id: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChatLog = {
  params: Joi.object().keys({
    chatLogId: Joi.string().custom(objectId),
  }),
};

const deleteChatLog = {
  params: Joi.object().keys({
    chatLogId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChatLog,
  createManyChatLogs,
  getChatLogs,
  getChatLog,
  deleteChatLog,
};
