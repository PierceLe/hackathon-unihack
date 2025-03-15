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

/**
 * @swagger
 * /chat-logs/my:
 *   get:
 *     summary: Get my chat logs
 *     description: Retrieve a list of chat logs for the authenticated user.
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: List of chat logs retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/my').get(auth('getChatLogs'), chatLogController.getMyChatLogs);

/**
 * @swagger
 * /chat-logs/my:
 *   delete:
 *     summary: Delete all my chat logs
 *     description: Delete all chat logs associated with the authenticated user.
 *     tags: [ChatLogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: Chat logs deleted successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/my').delete(auth('manageChatLogs'), chatLogController.deleteMyChatLogs);

router
  .route('/:chatLogId')
  .get(auth('getChatLogs'), validate(chatLogValidation.getChatLog), chatLogController.getChatLog)
  .delete(auth('manageChatLogs'), validate(chatLogValidation.deleteChatLog), chatLogController.deleteChatLog);

module.exports = router;
