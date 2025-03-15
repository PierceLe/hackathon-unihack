const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { crisisService } = require('../services');

const createCrisis = catchAsync(async (req, res) => {
  const crisis = await crisisService.createCrisis(req.body);
  res.status(httpStatus.CREATED).send(crisis);
});

const getCrises = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await crisisService.queryCrises(filter, options);
  res.send(result);
});

const getCrisis = catchAsync(async (req, res) => {
  const crisis = await crisisService.getCrisisById(req.params.crisisId);
  if (!crisis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis not found');
  }
  res.send(crisis);
});

const updateCrisis = catchAsync(async (req, res) => {
  const crisis = await crisisService.updateCrisisById(req.params.crisisId, req.body);
  res.send(crisis);
});

const deleteCrisis = catchAsync(async (req, res) => {
  await crisisService.deleteCrisisById(req.params.crisisId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCrisis,
  getCrises,
  getCrisis,
  updateCrisis,
  deleteCrisis,
};
