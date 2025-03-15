const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const crisisStateValidation = require('../../validations/crisisState.validation');
const crisisStateController = require('../../controllers/crisisState.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CrisisStates
 *   description: CrisisState management and retrieval
 */

/**
 * @swagger
 * /crisis-states:
 *   post:
 *     summary: Create a CrisisState
 *     description: Only admins can create CrisisState records.
 *     tags: [CrisisStates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - crisis_id
 *               - status
 *               - turn_left
 *             properties:
 *               crisis_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the associated crisis
 *               status:
 *                 type: string
 *                 enum: [active, resolved, failed]
 *               turn_left:
 *                 type: integer
 *                 description: Number of turns left before resolution
 *             example:
 *               crisis_id: "613b1c8f8c8a4a001cf6f9a5"
 *               status: "active"
 *               turn_left: 5
 *     responses:
 *       "201":
 *         description: CrisisState created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all CrisisStates
 *     description: Retrieve a paginated list of CrisisStates.
 *     tags: [CrisisStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, resolved, failed]
 *         description: Filter by status
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
 *         description: Maximum number of items per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of CrisisStates
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageCrises'), validate(crisisStateValidation.createCrisisState), crisisStateController.createCrisisState)
  .get(auth('getCrises'), crisisStateController.getCrisisStates);

/**
 * @swagger
 * /crisis-states/{crisisStateId}:
 *   get:
 *     summary: Get a CrisisState by ID
 *     description: Retrieve the details of a specific CrisisState.
 *     tags: [CrisisStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: CrisisState details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a CrisisState
 *     description: Modify the status or turn_left of a CrisisState.
 *     tags: [CrisisStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisStateId
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
 *               status:
 *                 type: string
 *                 enum: [active, resolved, failed]
 *               turn_left:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: CrisisState updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a CrisisState
 *     description: Remove a CrisisState record.
 *     tags: [CrisisStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: CrisisState deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:crisisStateId')
  .get(auth('getCrises'), validate(crisisStateValidation.getCrisisState), crisisStateController.getCrisisState)
  .patch(auth('manageCrises'), validate(crisisStateValidation.updateCrisisState), crisisStateController.updateCrisisState)
  .delete(auth('manageCrises'), validate(crisisStateValidation.deleteCrisisState), crisisStateController.deleteCrisisState);

module.exports = router;
