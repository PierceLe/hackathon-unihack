const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskStateValidation = require('../../validations/taskState.validation');
const taskStateController = require('../../controllers/taskState.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TaskStates
 *   description: Task state management and retrieval
 */

/**
 * @swagger
 * /task-states:
 *   post:
 *     summary: Create a new TaskState
 *     description: Only authorized users can create TaskStates.
 *     tags: [TaskStates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task_id
 *               - sp_left
 *               - sp_predicted
 *               - status
 *               - assignee
 *               - reviewer
 *             properties:
 *               task_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the associated task
 *               sp_left:
 *                 type: integer
 *                 description: Remaining SP for the task
 *               sp_predicted:
 *                 type: integer
 *                 description: Predicted SP needed for completion
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, testing, completed]
 *                 description: Current status of the task
 *               assignee:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the NPC assigned to the task
 *               reviewer:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the NPC reviewing the task
 *     responses:
 *       "201":
 *         description: TaskState created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all TaskStates
 *     description: Retrieve a list of TaskStates with pagination.
 *     tags: [TaskStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: task_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by Task ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, testing, completed]
 *         description: Filter by Task State status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort field (e.g., "createdAt:desc")
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of TaskStates per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of TaskStates retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageTaskStates'), validate(taskStateValidation.createTaskState), taskStateController.createTaskState)
  .get(auth('getTaskStates'), taskStateController.getTaskStates);

/**
 * @swagger
 * /task-states/{taskStateId}:
 *   get:
 *     summary: Get a specific TaskState by ID
 *     description: Retrieve detailed information about a TaskState.
 *     tags: [TaskStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: TaskState details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a TaskState
 *     description: Modify the details of a TaskState.
 *     tags: [TaskStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskStateId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sp_left:
 *                 type: integer
 *               sp_predicted:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, testing, completed]
 *               assignee:
 *                 type: string
 *                 format: uuid
 *               reviewer:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       "200":
 *         description: TaskState updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a TaskState
 *     description: Remove a TaskState from the database.
 *     tags: [TaskStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: TaskState deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:taskStateId')
  .get(auth('getTaskStates'), validate(taskStateValidation.getTaskState), taskStateController.getTaskState)
  .patch(auth('manageTaskStates'), validate(taskStateValidation.updateTaskState), taskStateController.updateTaskState)
  .delete(auth('manageTaskStates'), validate(taskStateValidation.deleteTaskState), taskStateController.deleteTaskState);

module.exports = router;
