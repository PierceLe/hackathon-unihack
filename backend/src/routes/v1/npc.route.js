const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const npcValidation = require('../../validations/npc.validation');
const npcController = require('../../controllers/npc.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NPCs
 *   description: NPC management and retrieval
 */

/**
 * @swagger
 * /npcs:
 *   post:
 *     summary: Create a new NPC
 *     description: Only admins can create NPCs.
 *     tags: [NPCs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model_id
 *               - name
 *               - age
 *               - role
 *               - max_stamina
 *               - max_mood
 *             properties:
 *               model_id:
 *                 type: string
 *                 description: Unique identifier for the NPC model
 *               name:
 *                 type: string
 *                 description: NPC's name
 *               age:
 *                 type: integer
 *                 description: NPC's age
 *               role:
 *                 type: string
 *                 description: Role of the NPC
 *               traits:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of trait IDs
 *               skills:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Skill set values
 *               max_stamina:
 *                 type: integer
 *                 description: Maximum stamina of the NPC
 *               max_mood:
 *                 type: integer
 *                 description: Maximum mood of the NPC
 *               image:
 *                 type: string
 *                 description: Image URL of the NPC
 *     responses:
 *       "201":
 *         description: NPC created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all NPCs
 *     description: Retrieve a list of NPCs.
 *     tags: [NPCs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: model_id
 *         schema:
 *           type: string
 *         description: Filter by model ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by NPC name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by NPC role
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
 *         description: Maximum number of NPCs per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of NPCs retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageNPCs'), validate(npcValidation.createNPC), npcController.createNPC)
  .get(auth('getNPCs'), npcController.getNPCs);

/**
 * @swagger
 * /npcs/{npcId}:
 *   get:
 *     summary: Get a specific NPC by ID
 *     description: Retrieve detailed information about an NPC.
 *     tags: [NPCs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: NPC details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an NPC
 *     description: Modify the details of an NPC.
 *     tags: [NPCs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcId
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
 *               age:
 *                 type: integer
 *               role:
 *                 type: string
 *               traits:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               skills:
 *                 type: array
 *                 items:
 *                   type: number
 *               max_stamina:
 *                 type: integer
 *               max_mood:
 *                 type: integer
 *               image:
 *                 type: string
 *     responses:
 *       "200":
 *         description: NPC updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an NPC
 *     description: Remove an NPC from the database.
 *     tags: [NPCs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: npcId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: NPC deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:npcId')
  .get(auth('getNPCs'), validate(npcValidation.getNPC), npcController.getNPC)
  .patch(auth('manageNPCs'), validate(npcValidation.updateNPC), npcController.updateNPC)
  .delete(auth('manageNPCs'), validate(npcValidation.deleteNPC), npcController.deleteNPC);

module.exports = router;
