const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameStateService } = require('../services');

const createGameState = catchAsync(async (req, res) => {
  const gameState = await gameStateService.createGameState(req.body);
  res.status(httpStatus.CREATED).send(gameState);
});

const getGameStates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user_id', 'stage']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gameStateService.queryGameStates(filter, options);
  res.send(result);
});

const getGameState = catchAsync(async (req, res) => {
  const gameState = await gameStateService.getGameStateById(req.params.gameStateId);
  if (!gameState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'GameState not found');
  }
  res.send(gameState);
});

const updateGameState = catchAsync(async (req, res) => {
  const gameState = await gameStateService.updateGameStateById(req.params.gameStateId, req.body);
  res.send(gameState);
});

const deleteGameState = catchAsync(async (req, res) => {
  await gameStateService.deleteGameStateById(req.params.gameStateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGameState,
  getGameStates,
  getGameState,
  updateGameState,
  deleteGameState,
};
