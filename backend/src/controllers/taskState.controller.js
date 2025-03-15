const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskStateService } = require('../services');

const createTaskState = catchAsync(async (req, res) => {
  const taskState = await taskStateService.createTaskState(req.body);
  res.status(httpStatus.CREATED).send(taskState);
});

const getTaskStates = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['task_id', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await taskStateService.queryTaskStates(filter, options);
  res.send(result);
});

const getTaskState = catchAsync(async (req, res) => {
  const taskState = await taskStateService.getTaskStateById(req.params.taskStateId);
  if (!taskState) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TaskState not found');
  }
  res.send(taskState);
});

const updateTaskState = catchAsync(async (req, res) => {
  const taskState = await taskStateService.updateTaskStateById(req.params.taskStateId, req.body);
  res.send(taskState);
});

const deleteTaskState = catchAsync(async (req, res) => {
  await taskStateService.deleteTaskStateById(req.params.taskStateId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTaskState,
  getTaskStates,
  getTaskState,
  updateTaskState,
  deleteTaskState,
};
