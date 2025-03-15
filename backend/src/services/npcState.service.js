const httpStatus = require('http-status');
const { NPCState } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo NPCState mới
 * @param {Object} npcStateBody
 * @returns {Promise<NPCState>}
 */
const createNPCState = async (npcStateBody) => {
  return NPCState.create(npcStateBody);
};

/**
 * Lấy danh sách NPCState có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryNPCStates = async (filter, options) => {
  return NPCState.paginate(filter, options);
};

/**
 * Lấy NPCState theo ID
 * @param {ObjectId} id
 * @returns {Promise<NPCState>}
 */
const getNPCStateById = async (id) => {
  return NPCState.findById(id).populate('npc_id');
};

/**
 * Cập nhật NPCState theo ID
 * @param {ObjectId} npcStateId
 * @param {Object} updateBody
 * @returns {Promise<NPCState>}
 */
const updateNPCStateById = async (npcStateId, updateBody) => {
  const npcState = await getNPCStateById(npcStateId);
  if (!npcState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPCState not found');
  }

  Object.assign(npcState, updateBody);
  await npcState.save();
  return npcState;
};

/**
 * Xóa NPCState theo ID
 * @param {ObjectId} npcStateId
 * @returns {Promise<NPCState>}
 */
const deleteNPCStateById = async (npcStateId) => {
  const npcState = await getNPCStateById(npcStateId);
  if (!npcState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPCState not found');
  }
  await npcState.remove();
  return npcState;
};

module.exports = {
  createNPCState,
  queryNPCStates,
  getNPCStateById,
  updateNPCStateById,
  deleteNPCStateById,
};
