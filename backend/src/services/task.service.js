const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { update } = require('../models/task.model');

/**
 * Tạo Task mới
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  return Task.create(taskBody);
};

/**
 * Lấy danh sách Task có phân trang
 * @param {Object} filter - Bộ lọc tìm kiếm
 * @param {Object} options - Phân trang (limit, page, sort)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async (filter, options) => {
  return Task.paginate(filter, options);
};

/**
 * Lấy Task theo ID
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return Task.findById(id).populate('dependencies');
};

/**
 * Cập nhật Task theo ID
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Xóa Task theo ID
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

const initManyTasks = async (tasks, userId) => {
  return Task.insertMany(tasks?.map((task) => ({ ...task, userId })));
}

const getMyTasks = async (userId) => {
  return Task.find({ userId }).sort({ updatedAt: 1 });
}

const updateTaskByStatus = async (taskId, status) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  task.status = status;
  await task.save();
  return task;
}

module.exports = {
  getMyTasks,
  createTask,
  queryTasks,
  getTaskById,
  initManyTasks,
  deleteTaskById,
  updateTaskById,
  updateTaskByStatus
};
