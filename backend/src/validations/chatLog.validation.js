const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChatLog = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId).required(),
    npc_id: Joi.string().custom(objectId).optional(),
    model_id: Joi.string().optional(),
    message_content: Joi.string().required(),
  }),
};

const createManyChatLogs = {
  body: Joi.object().keys({
    chatLogs: Joi.array().items(
      Joi.object().keys({
        user_id: Joi.string().custom(objectId).required(),
        npc_id: Joi.string().custom(objectId).optional(),
        model_id: Joi.string().optional(),
        message_content: Joi.string().required(),
      })
    ).min(1),
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
  getChatLog,
  deleteChatLog,
};
