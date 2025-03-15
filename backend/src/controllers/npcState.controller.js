const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { npcStateService } = require('../services');

const createNPCState = catchAsync(async (req, res) => {
  const npcState = await npcStateService.createNPCState(req.body);
  res.status(httpStatus.CREATED).send(npcState);
});

const getNPCStates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['npc_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await npcStateService.queryNPCStates(filter, options);
  res.send(result);
});

const getNPCState = catchAsync(async (req, res) => {
  const npcState = await npcStateService.getNPCStateById(req.params.npcStateId);
  if (!npcState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPCState not found');
  }
  res.send(npcState);
});

const updateNPCState = catchAsync(async (req, res) => {
  const npcState = await npcStateService.updateNPCStateById(req.params.npcStateId, req.body);
  res.send(npcState);
});

const deleteNPCState = catchAsync(async (req, res) => {
  await npcStateService.deleteNPCStateById(req.params.npcStateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNPCState,
  getNPCStates,
  getNPCState,
  updateNPCState,
  deleteNPCState,
};
