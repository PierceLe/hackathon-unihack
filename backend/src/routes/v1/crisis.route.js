const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const crisisValidation = require('../../validations/crisis.validation');
const crisisController = require('../../controllers/crisis.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCrises'), validate(crisisValidation.createCrisis), crisisController.createCrisis)
  .get(auth('getCrises'), validate(crisisValidation.getCrises), crisisController.getCrises);

router
  .route('/:crisisId')
  .get(auth('getCrises'), validate(crisisValidation.getCrisis), crisisController.getCrisis)
  .patch(auth('manageCrises'), validate(crisisValidation.updateCrisis), crisisController.updateCrisis)
  .delete(auth('manageCrises'), validate(crisisValidation.deleteCrisis), crisisController.deleteCrisis);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Crises
 *   description: Crisis management and retrieval
 */

/**
 * @swagger
 * /crises:
 *   post:
 *     summary: Create a crisis
 *     description: Only admins can create crises.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - effect
 *               - activation_condition
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Must have exactly 6 numbers
 *               activation_condition:
 *                 type: string
 *             example:
 *               id: "crisis_001"
 *               name: "Economic Collapse"
 *               description: "A severe economic downturn"
 *               effect: [10, 20, -5, -10, 15, -30]
 *               activation_condition: "GDP falls by 10%"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Crisis'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all crises
 *     description: Users can retrieve all crises.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Crisis name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of crises per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Crisis'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /crises/{id}:
 *   get:
 *     summary: Get a crisis
 *     description: Users can fetch details of a specific crisis.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crisis ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Crisis'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a crisis
 *     description: Only admins can update crises.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crisis ID
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
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Must have exactly 6 numbers
 *               activation_condition:
 *                 type: string
 *             example:
 *               name: "Economic Recession"
 *               description: "A less severe economic downturn"
 *               effect: [5, 10, -2, -5, 7, -15]
 *               activation_condition: "GDP falls by 5%"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Crisis'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a crisis
 *     description: Only admins can delete crises.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crisis ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
