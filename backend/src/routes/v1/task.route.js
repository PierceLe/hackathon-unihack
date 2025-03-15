const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management and retrieval
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new Task
 *     description: Only admins can create Tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *               - tsp
 *               - path
 *             properties:
 *               name:
 *                 type: string
 *                 description: Task name
 *               description:
 *                 type: string
 *                 description: Task description
 *               type:
 *                 type: string
 *                 description: Type of task
 *               dependencies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of dependent task IDs
 *               tsp:
 *                 type: integer
 *                 description: Time required to complete the task
 *               path:
 *                 type: string
 *                 description: Task execution path
 *     responses:
 *       "201":
 *         description: Task created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all Tasks
 *     description: Retrieve a list of Tasks with pagination.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by task name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by task type
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
 *         description: Maximum number of Tasks per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of Tasks retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageTasks'), validate(taskValidation.createTask), taskController.createTask)
  .get(auth('getTasks'), taskController.getTasks);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a specific Task by ID
 *     description: Retrieve detailed information about a Task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Task details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Task
 *     description: Modify the details of a Task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               dependencies:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               tsp:
 *                 type: integer
 *               path:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Task updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Task
 *     description: Remove a Task from the database.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Task deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:taskId')
  .get(auth('getTasks'), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth('manageTasks'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth('manageTasks'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;
