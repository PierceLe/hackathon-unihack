const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatLogService } = require('../services');

const createChatLog = catchAsync(async (req, res) => {
  const chatLog = await chatLogService.createChatLog(req.body);
  res.status(httpStatus.CREATED).send(chatLog);
});

const createManyChatLogs = catchAsync(async (req, res) => {
  const chatLogs = await chatLogService.createManyChatLogs(req.body.chatLogs);
  res.status(httpStatus.CREATED).send(chatLogs);
});

const getChatLogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user_id', 'npc_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await chatLogService.queryChatLogs(filter, options);
  res.send(result);
});

const getChatLog = catchAsync(async (req, res) => {
  const chatLog = await chatLogService.getChatLogById(req.params.chatLogId);
  if (!chatLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ChatLog not found');
  }
  res.send(chatLog);
});

const deleteChatLog = catchAsync(async (req, res) => {
  await chatLogService.deleteChatLogById(req.params.chatLogId);
  res.status(httpStatus.NO_CONTENT).send();
});


/**
 * Lấy danh sách chatlog của chính người dùng, sorted theo timestamp
 */
const getMyChatLogs = catchAsync(async (req, res) => {
  const userId = req.user.id; // Lấy user_id từ token authentication
  const result = await chatLogService.getChatLogsByUserId(userId);
  res.send(result);
});

/**
 * Xóa tất cả chatlog của người dùng hiện tại
 */
const deleteMyChatLogs = catchAsync(async (req, res) => {
  const userId = req.user.id; // Lấy user_id từ token authentication
  await chatLogService.deleteChatLogsByUserId(userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChatLog,
  createManyChatLogs,
  getChatLogs,
  getChatLog,
  deleteChatLog,
  getMyChatLogs,
  deleteMyChatLogs,
};
