const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

const getTask = catchAsync(async (req, res) => {
  const task = await taskService.getTaskById(req.params.taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskById(req.params.taskId, req.body);
  res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
  await taskService.deleteTaskById(req.params.taskId);
  res.status(httpStatus.NO_CONTENT).send();
});

const initManyTasks = catchAsync(async (req, res) => {
  const { user } = req;
  const tasksCreated = await taskService.initManyTasks(req.body.tasks, user.id);
  res.send({
    status: httpStatus.OK,
    tasks: tasksCreated
  });
});

const getMyTasks = catchAsync(async (req, res) => {
  const { user } = req;
  const tasks = await taskService.getMyTasks(user.id);
  res.send({
    status: httpStatus.OK,
    tasks
  });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  await taskService.updateTaskByStatus(taskId, status);
  res.send({
    status: httpStatus.OK,
    message: 'Task status updated'
  });
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getMyTasks,
  updateTaskStatus,
  initManyTasks
};
