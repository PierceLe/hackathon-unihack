const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const chatLogValidation = require('../../validations/chatLog.validation');
const chatLogController = require('../../controllers/chatLog.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ChatLogs
 *   description: Chat log management and retrieval
 */

router
  .route('/')
  .post(auth('manageChatLogs'), validate(chatLogValidation.createChatLog), chatLogController.createChatLog)
  .get(auth('getChatLogs'), chatLogController.getChatLogs);

router
  .route('/bulk')
  .post(auth('manageChatLogs'), validate(chatLogValidation.createManyChatLogs), chatLogController.createManyChatLogs);

router
  .route('/:chatLogId')
  .get(auth('getChatLogs'), validate(chatLogValidation.getChatLog), chatLogController.getChatLog)
  .delete(auth('manageChatLogs'), validate(chatLogValidation.deleteChatLog), chatLogController.deleteChatLog);

module.exports = router;
