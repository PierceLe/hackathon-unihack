const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { npcService } = require('../services');

const createNPC = catchAsync(async (req, res) => {
  const npc = await npcService.createNPC(req.body);
  res.status(httpStatus.CREATED).send(npc);
});

const getNPCs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'model_id', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await npcService.queryNPCs(filter, options);
  res.send(result);
});

const getNPC = catchAsync(async (req, res) => {
  const npc = await npcService.getNPCById(req.params.npcId);
  if (!npc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPC not found');
  }
  res.send(npc);
});

const updateNPC = catchAsync(async (req, res) => {
  const npc = await npcService.updateNPCById(req.params.npcId, req.body);
  res.send(npc);
});

const deleteNPC = catchAsync(async (req, res) => {
  await npcService.deleteNPCById(req.params.npcId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNPC,
  getNPCs,
  getNPC,
  updateNPC,
  deleteNPC,
};
