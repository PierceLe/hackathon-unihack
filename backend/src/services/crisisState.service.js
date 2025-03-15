const httpStatus = require('http-status');
const { CrisisState } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo mới một CrisisState
 * @param {Object} crisisStateBody
 * @returns {Promise<CrisisState>}
 */
const createCrisisState = async (crisisStateBody) => {
  return CrisisState.create(crisisStateBody);
};

/**
 * Lấy danh sách CrisisState có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryCrisisStates = async (filter, options) => {
  return CrisisState.paginate(filter, options);
};

/**
 * Lấy CrisisState theo ID
 * @param {ObjectId} id
 * @returns {Promise<CrisisState>}
 */
const getCrisisStateById = async (id) => {
  return CrisisState.findById(id).populate('crisis_id');
};

/**
 * Cập nhật CrisisState theo ID
 * @param {ObjectId} crisisStateId
 * @param {Object} updateBody
 * @returns {Promise<CrisisState>}
 */
const updateCrisisStateById = async (crisisStateId, updateBody) => {
  const crisisState = await getCrisisStateById(crisisStateId);
  if (!crisisState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CrisisState not found');
  }

  Object.assign(crisisState, updateBody);
  await crisisState.save();
  return crisisState;
};

/**
 * Xóa CrisisState theo ID
 * @param {ObjectId} crisisStateId
 * @returns {Promise<CrisisState>}
 */
const deleteCrisisStateById = async (crisisStateId) => {
  const crisisState = await getCrisisStateById(crisisStateId);
  if (!crisisState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CrisisState not found');
  }
  await crisisState.remove();
  return crisisState;
};

module.exports = {
  createCrisisState,
  queryCrisisStates,
  getCrisisStateById,
  updateCrisisStateById,
  deleteCrisisStateById,
};
