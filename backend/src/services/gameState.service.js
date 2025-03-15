const httpStatus = require('http-status');
const { GameState } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo một GameState mới
 * @param {Object} gameStateBody
 * @returns {Promise<GameState>}
 */
const createGameState = async (gameStateBody) => {
  return GameState.create(gameStateBody);
};

/**
 * Lấy danh sách GameState có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryGameStates = async (filter, options) => {
  return GameState.paginate(filter, options);
};

/**
 * Lấy GameState theo ID
 * @param {ObjectId} id
 * @returns {Promise<GameState>}
 */
const getGameStateById = async (id) => {
  return GameState.findById(id)
    .populate('user_id')
    .populate('npc_state')
    .populate('tasks')
    .populate('crises');
};

/**
 * Cập nhật GameState theo ID
 * @param {ObjectId} gameStateId
 * @param {Object} updateBody
 * @returns {Promise<GameState>}
 */
const updateGameStateById = async (gameStateId, updateBody) => {
  const gameState = await getGameStateById(gameStateId);
  if (!gameState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GameState not found');
  }

  Object.assign(gameState, updateBody);
  await gameState.save();
  return gameState;
};

/**
 * Xóa GameState theo ID
 * @param {ObjectId} gameStateId
 * @returns {Promise<GameState>}
 */
const deleteGameStateById = async (gameStateId) => {
  const gameState = await getGameStateById(gameStateId);
  if (!gameState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GameState not found');
  }
  await gameState.remove();
  return gameState;
};

module.exports = {
  createGameState,
  queryGameStates,
  getGameStateById,
  updateGameStateById,
  deleteGameStateById,
};
