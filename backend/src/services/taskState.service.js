const httpStatus = require('http-status');
const { TaskState } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Tạo TaskState mới
 * @param {Object} taskStateBody
 * @returns {Promise<TaskState>}
 */
const createTaskState = async (taskStateBody) => {
  return TaskState.create(taskStateBody);
};

/**
 * Lấy danh sách TaskState có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryTaskStates = async (filter, options) => {
  return TaskState.paginate(filter, options);
};

/**
 * Lấy TaskState theo ID
 * @param {ObjectId} id
 * @returns {Promise<TaskState>}
 */
const getTaskStateById = async (id) => {
  return TaskState.findById(id).populate('task_id assignee reviewer');
};

/**
 * Cập nhật TaskState theo ID
 * @param {ObjectId} taskStateId
 * @param {Object} updateBody
 * @returns {Promise<TaskState>}
 */
const updateTaskStateById = async (taskStateId, updateBody) => {
  const taskState = await getTaskStateById(taskStateId);
  if (!taskState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TaskState not found');
  }

  Object.assign(taskState, updateBody);
  await taskState.save();
  return taskState;
};

/**
 * Xóa TaskState theo ID
 * @param {ObjectId} taskStateId
 * @returns {Promise<TaskState>}
 */
const deleteTaskStateById = async (taskStateId) => {
  const taskState = await getTaskStateById(taskStateId);
  if (!taskState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TaskState not found');
  }
  await taskState.remove();
  return taskState;
};

module.exports = {
  createTaskState,
  queryTaskStates,
  getTaskStateById,
  updateTaskStateById,
  deleteTaskStateById,
};
