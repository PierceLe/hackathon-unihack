const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTaskState = {
  body: Joi.object().keys({
    task_id: Joi.string().custom(objectId).required(),
    sp_left: Joi.number().required(),
    sp_predicted: Joi.number().required(),
    status: Joi.string().valid('pending', 'in_progress', 'testing', 'completed').required(),
    assignee: Joi.string().custom(objectId).required(),
    reviewer: Joi.string().custom(objectId).required(),
  }),
};

const getTaskStates = {
  query: Joi.object().keys({
    task_id: Joi.string().custom(objectId),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTaskState = {
  params: Joi.object().keys({
    taskStateId: Joi.string().custom(objectId),
  }),
};

const updateTaskState = {
  params: Joi.object().keys({
    taskStateId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    sp_left: Joi.number(),
    sp_predicted: Joi.number(),
    status: Joi.string().valid('pending', 'in_progress', 'testing', 'completed'),
    assignee: Joi.string().custom(objectId),
    reviewer: Joi.string().custom(objectId),
  }).min(1),
};

const deleteTaskState = {
  params: Joi.object().keys({
    taskStateId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTaskState,
  getTaskStates,
  getTaskState,
  updateTaskState,
  deleteTaskState,
};
