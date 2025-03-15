const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const npcStateValidation = require('../../validations/npcState.validation');
const npcStateController = require('../../controllers/npcState.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NPCStates
 *   description: NPC state management and retrieval
 */

/**
 * @swagger
 * /npc-states:
 *   post:
 *     summary: Create a new NPCState
 *     description: Only admins can create NPCState records.
 *     tags: [NPCStates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - npc_id
 *               - current_stamina
 *               - current_mood
 *             properties:
 *               npc_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the associated NPC
 *               current_stamina:
 *                 type: integer
 *                 description: Current stamina level of the NPC
 *               current_mood:
 *                 type: integer
 *                 description: Current mood level of the NPC
 *     responses:
 *       "201":
 *         description: NPCState created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all NPCStates
 *     description: Retrieve a list of NPCStates with pagination.
 *     tags: [NPCStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: npc_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by NPC ID
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
 *         description: Maximum number of NPCStates per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of NPCStates retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageNPCStates'), validate(npcStateValidation.createNPCState), npcStateController.createNPCState)
  .get(auth('getNPCStates'), npcStateController.getNPCStates);

/**
 * @swagger
 * /npc-states/{npcStateId}:
 *   get:
 *     summary: Get a specific NPCState by ID
 *     description: Retrieve detailed information about an NPCState.
 *     tags: [NPCStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: NPCState details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an NPCState
 *     description: Modify the details of an NPCState.
 *     tags: [NPCStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcStateId
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
 *               current_stamina:
 *                 type: integer
 *               current_mood:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: NPCState updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an NPCState
 *     description: Remove an NPCState from the database.
 *     tags: [NPCStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: NPCState deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:npcStateId')
  .get(auth('getNPCStates'), validate(npcStateValidation.getNPCState), npcStateController.getNPCState)
  .patch(auth('manageNPCStates'), validate(npcStateValidation.updateNPCState), npcStateController.updateNPCState)
  .delete(auth('manageNPCStates'), validate(npcStateValidation.deleteNPCState), npcStateController.deleteNPCState);

module.exports = router;
