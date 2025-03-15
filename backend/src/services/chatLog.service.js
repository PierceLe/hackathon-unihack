const httpStatus = require('http-status');
const { ChatLog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo ChatLog mới
 * @param {Object} chatLogBody
 * @returns {Promise<ChatLog>}
 */
const createChatLog = async (chatLogBody) => {
  return ChatLog.create(chatLogBody);
};

/**
 * Tạo nhiều ChatLogs
 * @param {Array} chatLogs
 * @returns {Promise<Array<ChatLog>>}
 */
const createManyChatLogs = async (chatLogs) => {
  return ChatLog.insertMany(chatLogs);
};

/**
 * Lấy danh sách ChatLogs có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryChatLogs = async (filter, options) => {
  return ChatLog.paginate(filter, options);
};

/**
 * Lấy ChatLog theo ID
 * @param {ObjectId} id
 * @returns {Promise<ChatLog>}
 */
const getChatLogById = async (id) => {
  return ChatLog.findById(id).populate('user_id npc_id');
};

/**
 * Xóa ChatLog theo ID
 * @param {ObjectId} chatLogId
 * @returns {Promise<ChatLog>}
 */
const deleteChatLogById = async (chatLogId) => {
  const chatLog = await getChatLogById(chatLogId);
  if (!chatLog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ChatLog not found');
  }
  await chatLog.remove();
  return chatLog;
};

/**
 * Lấy tất cả chatlogs của một user theo `user_id`, sorted theo timestamp giảm dần
 */
const getChatLogsByUserId = async (userId) => {
  return ChatLog.find({ user_id: userId }).sort({ timestamp: -1 });
};

/**
 * Xóa tất cả chatlogs của một user theo `user_id`
 */
const deleteChatLogsByUserId = async (userId) => {
  await ChatLog.deleteMany({ user_id: userId });
};


module.exports = {
  createChatLog,
  createManyChatLogs,
  queryChatLogs,
  getChatLogById,
  deleteChatLogById,
  getChatLogsByUserId,
  deleteChatLogsByUserId,
};
