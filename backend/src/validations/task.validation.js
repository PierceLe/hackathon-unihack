const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    dependencies: Joi.array().items(Joi.string().custom(objectId)),
    tsp: Joi.number().required(),
    path: Joi.string().required(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
    dependencies: Joi.array().items(Joi.string().custom(objectId)),
    tsp: Joi.number(),
    path: Joi.string(),
  }).min(1),
};

const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().custom(objectId),
  }),
};

const updateTaskByStatus = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    status: Joi.string().required(),
  })
};

const initManyTasks = {
  body: Joi.object().keys({
    tasks: Joi.array().items(
      Joi.object().keys({
        tsp: Joi.number().optional(),
        name: Joi.string().required(),
        type: Joi.string().optional(),
        path: Joi.string().optional(),
        modelId: Joi.string().optional(),
        spLeft: Joi.number().optional(),
        description: Joi.string().optional(),
        spPredicted: Joi.number().optional(),
        assignee: Joi.string().custom(objectId).optional(),
        dependencies: Joi.array().items(Joi.string().custom(objectId)).optional(),
      })
    ).min(1),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskByStatus,
  initManyTasks
};
