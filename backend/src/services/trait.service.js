const httpStatus = require('http-status');
const { Trait } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo Trait mới
 * @param {Object} traitBody
 * @returns {Promise<Trait>}
 */
const createTrait = async (traitBody) => {
  return Trait.create(traitBody);
};

/**
 * Lấy danh sách Trait có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryTraits = async (filter, options) => {
  return Trait.paginate(filter, options);
};

/**
 * Lấy Trait theo ID
 * @param {ObjectId} id
 * @returns {Promise<Trait>}
 */
const getTraitById = async (id) => {
  return Trait.findById(id);
};

/**
 * Cập nhật Trait theo ID
 * @param {ObjectId} traitId
 * @param {Object} updateBody
 * @returns {Promise<Trait>}
 */
const updateTraitById = async (traitId, updateBody) => {
  const trait = await getTraitById(traitId);
  if (!trait) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trait not found');
  }

  Object.assign(trait, updateBody);
  await trait.save();
  return trait;
};

/**
 * Xóa Trait theo ID
 * @param {ObjectId} traitId
 * @returns {Promise<Trait>}
 */
const deleteTraitById = async (traitId) => {
  const trait = await getTraitById(traitId);
  if (!trait) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trait not found');
  }
  await trait.remove();
  return trait;
};

module.exports = {
  createTrait,
  queryTraits,
  getTraitById,
  updateTraitById,
  deleteTraitById,
};
