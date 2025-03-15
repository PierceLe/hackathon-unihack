const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const crisisValidation = require('../../validations/crisis.validation');
const crisisController = require('../../controllers/crisis.controller');

const router = express.Router();

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
 *               - name
 *               - description
 *               - role_needed
 *               - effect
 *               - resolution
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               role_needed:
 *                 type: string
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *               resolution:
 *                 type: string
 *             example:
 *               name: "Cybersecurity Breach"
 *               description: "A critical cybersecurity threat detected."
 *               role_needed: "Security Analyst"
 *               effect: [5, 3, -2]
 *               resolution: "Implement firewall patch"
 *     responses:
 *       "201":
 *         description: Crisis created successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all crises
 *     description: Fetch all available crisis records.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: List of crises
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageCrises'), validate(crisisValidation.createCrisis), crisisController.createCrisis)
  .get(auth('getCrises'), crisisController.getCrises);

/**
 * @swagger
 * /crises/{crisisId}:
 *   get:
 *     summary: Get a crisis by ID
 *     description: Retrieve details of a crisis.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Crisis details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a crisis
 *     description: Modify crisis details.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisId
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
 *               role_needed:
 *                 type: string
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *               resolution:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Crisis updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a crisis
 *     description: Remove a crisis from the database.
 *     tags: [Crises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: crisisId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Crisis deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:crisisId')
  .get(auth('getCrises'), validate(crisisValidation.getCrisis), crisisController.getCrisis)
  .patch(auth('manageCrises'), validate(crisisValidation.updateCrisis), crisisController.updateCrisis)
  .delete(auth('manageCrises'), validate(crisisValidation.deleteCrisis), crisisController.deleteCrisis);

module.exports = router;
