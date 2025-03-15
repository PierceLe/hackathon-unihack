const httpStatus = require('http-status');
const { GameState } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a game state
 * @param {Object} gameStateBody
 * @returns {Promise<GameState>}
 */
const createGameState = async (gameStateBody) => {
  return GameState.create(gameStateBody);
};

/**
 * Query for game states
 * @param {Object} filter - MongoDB filter
 * @param {Object} options - Query options (pagination, sorting)
 * @returns {Promise<QueryResult>}
 */
const queryGameStates = async (filter, options) => {
  return GameState.paginate(filter, options);
};

/**
 * Get game state by id
 * @param {ObjectId} id
 * @returns {Promise<GameState>}
 */
const getGameStateById = async (id) => {
  return GameState.findById(id).populate('user_id npc_state tasks crises');
};

/**
 * Update game state by id
 * @param {ObjectId} gameStateId
 * @param {Object} updateBody
 * @returns {Promise<GameState>}
 */
const updateGameStateById = async (gameStateId, updateBody) => {
  const gameState = await getGameStateById(gameStateId);
  if (!gameState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game state not found');
  }
  Object.assign(gameState, updateBody);
  await gameState.save();
  return gameState;
};

/**
 * Delete game state by id
 * @param {ObjectId} gameStateId
 * @returns {Promise<GameState>}
 */
const deleteGameStateById = async (gameStateId) => {
  const gameState = await getGameStateById(gameStateId);
  if (!gameState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game state not found');
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
