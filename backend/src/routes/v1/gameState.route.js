const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gameStateValidation = require('../../validations/gameState.validation');
const gameStateController = require('../../controllers/gameState.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: GameStates
 *   description: GameState management and retrieval
 */

/**
 * @swagger
 * /game-states:
 *   post:
 *     summary: Create a GameState
 *     description: Only admins can create game state records.
 *     tags: [GameStates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - stage
 *               - judge_score
 *               - turn_before_next_stage
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the associated user
 *               npc_state:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of NPCState IDs
 *               stage:
 *                 type: integer
 *                 description: Current stage of the game
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of TaskState IDs
 *               chat_log:
 *                 type: string
 *                 description: Chat log history
 *               crises:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of CrisisState IDs
 *               judge_score:
 *                 type: number
 *                 description: Score from the judge
 *               turn_before_next_stage:
 *                 type: number
 *                 description: Turns left before moving to the next stage
 *     responses:
 *       "201":
 *         description: GameState created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all GameStates
 *     description: Retrieve a paginated list of GameStates.
 *     tags: [GameStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by user ID
 *       - in: query
 *         name: stage
 *         schema:
 *           type: integer
 *         description: Filter by stage
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
 *         description: List of GameStates
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageGameStates'), validate(gameStateValidation.createGameState), gameStateController.createGameState)
  .get(auth('getGameStates'), gameStateController.getGameStates);

/**
 * @swagger
 * /game-states/{gameStateId}:
 *   get:
 *     summary: Get a GameState by ID
 *     description: Retrieve the details of a specific GameState.
 *     tags: [GameStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: GameState details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a GameState
 *     description: Modify the stage, score, or turn count of a GameState.
 *     tags: [GameStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameStateId
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
 *               stage:
 *                 type: integer
 *               judge_score:
 *                 type: number
 *               turn_before_next_stage:
 *                 type: number
 *     responses:
 *       "200":
 *         description: GameState updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a GameState
 *     description: Remove a GameState record.
 *     tags: [GameStates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameStateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: GameState deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:gameStateId')
  .get(auth('getGameStates'), validate(gameStateValidation.getGameState), gameStateController.getGameState)
  .patch(auth('manageGameStates'), validate(gameStateValidation.updateGameState), gameStateController.updateGameState)
  .delete(auth('manageGameStates'), validate(gameStateValidation.deleteGameState), gameStateController.deleteGameState);

module.exports = router;
