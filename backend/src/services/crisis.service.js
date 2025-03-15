const httpStatus = require('http-status');
const { Crisis } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a crisis
 * @param {Object} crisisBody
 * @returns {Promise<Crisis>}
 */
const createCrisis = async (crisisBody) => {
  return Crisis.create(crisisBody);
};

/**
 * Query for crises
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryCrises = async (filter, options) => {
  return Crisis.paginate(filter, options);
};

/**
 * Get crisis by id
 * @param {ObjectId} id
 * @returns {Promise<Crisis>}
 */
const getCrisisById = async (id) => {
  return Crisis.findById(id);
};

/**
 * Update crisis by id
 * @param {ObjectId} crisisId
 * @param {Object} updateBody
 * @returns {Promise<Crisis>}
 */
const updateCrisisById = async (crisisId, updateBody) => {
  const crisis = await getCrisisById(crisisId);
  if (!crisis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis not found');
  }
  Object.assign(crisis, updateBody);
  await crisis.save();
  return crisis;
};

/**
 * Delete crisis by id
 * @param {ObjectId} crisisId
 * @returns {Promise<Crisis>}
 */
const deleteCrisisById = async (crisisId) => {
  const crisis = await getCrisisById(crisisId);
  if (!crisis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis not found');
  }
  await crisis.remove();
  return crisis;
};

module.exports = {
  createCrisis,
  queryCrises,
  getCrisisById,
  updateCrisisById,
  deleteCrisisById,
};
