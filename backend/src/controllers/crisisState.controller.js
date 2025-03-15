const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { crisisStateService } = require('../services');

const createCrisisState = catchAsync(async (req, res) => {
  const crisisState = await crisisStateService.createCrisisState(req.body);
  res.status(httpStatus.CREATED).send(crisisState);
});

const getCrisisStates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await crisisStateService.queryCrisisStates(filter, options);
  res.send(result);
});

const getCrisisState = catchAsync(async (req, res) => {
  const crisisState = await crisisStateService.getCrisisStateById(req.params.crisisStateId);
  if (!crisisState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CrisisState not found');
  }
  res.send(crisisState);
});

const updateCrisisState = catchAsync(async (req, res) => {
  const crisisState = await crisisStateService.updateCrisisStateById(req.params.crisisStateId, req.body);
  res.send(crisisState);
});

const deleteCrisisState = catchAsync(async (req, res) => {
  await crisisStateService.deleteCrisisStateById(req.params.crisisStateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCrisisState,
  getCrisisStates,
  getCrisisState,
  updateCrisisState,
  deleteCrisisState,
};
