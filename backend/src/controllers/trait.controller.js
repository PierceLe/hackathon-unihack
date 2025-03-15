const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { traitService } = require('../services');

const createTrait = catchAsync(async (req, res) => {
  const trait = await traitService.createTrait(req.body);
  res.status(httpStatus.CREATED).send(trait);
});

const getTraits = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['hidden']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await traitService.queryTraits(filter, options);
  res.send(result);
});

const getTrait = catchAsync(async (req, res) => {
  const trait = await traitService.getTraitById(req.params.traitId);
  if (!trait) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trait not found');
  }
  res.send(trait);
});

const updateTrait = catchAsync(async (req, res) => {
  const trait = await traitService.updateTraitById(req.params.traitId, req.body);
  res.send(trait);
});

const deleteTrait = catchAsync(async (req, res) => {
  await traitService.deleteTraitById(req.params.traitId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTrait,
  getTraits,
  getTrait,
  updateTrait,
  deleteTrait,
};
