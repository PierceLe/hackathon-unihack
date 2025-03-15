const httpStatus = require('http-status');
const { NPC } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo NPC mới
 * @param {Object} npcBody
 * @returns {Promise<NPC>}
 */
const createNPC = async (npcBody) => {
  if (await NPC.isModelIdTaken(npcBody.model_id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Model ID already taken');
  }
  return NPC.create(npcBody);
};

/**
 * Lấy danh sách NPC có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryNPCs = async (filter, options) => {
  return NPC.paginate(filter, options);
};

/**
 * Lấy NPC theo ID
 * @param {ObjectId} id
 * @returns {Promise<NPC>}
 */
const getNPCById = async (id) => {
  return NPC.findById(id).populate('traits');
};

/**
 * Cập nhật NPC theo ID
 * @param {ObjectId} npcId
 * @param {Object} updateBody
 * @returns {Promise<NPC>}
 */
const updateNPCById = async (npcId, updateBody) => {
  const npc = await getNPCById(npcId);
  if (!npc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPC not found');
  }

  if (updateBody.model_id && (await NPC.isModelIdTaken(updateBody.model_id, npcId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Model ID already taken');
  }

  Object.assign(npc, updateBody);
  await npc.save();
  return npc;
};

/**
 * Xóa NPC theo ID
 * @param {ObjectId} npcId
 * @returns {Promise<NPC>}
 */
const deleteNPCById = async (npcId) => {
  const npc = await getNPCById(npcId);
  if (!npc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NPC not found');
  }
  await npc.remove();
  return npc;
};

module.exports = {
  createNPC,
  queryNPCs,
  getNPCById,
  updateNPCById,
  deleteNPCById,
};
