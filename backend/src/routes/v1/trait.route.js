const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const traitValidation = require('../../validations/trait.validation');
const traitController = require('../../controllers/trait.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Traits
 *   description: Trait management and retrieval
 */

/**
 * @swagger
 * /traits:
 *   post:
 *     summary: Create a new Trait
 *     description: Only authorized users can create Traits.
 *     tags: [Traits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               hidden:
 *                 type: boolean
 *                 default: false
 *                 description: Whether the trait is hidden
 *               description:
 *                 type: string
 *                 description: Description of the trait
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: List of effect values
 *     responses:
 *       "201":
 *         description: Trait created successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *
 *   get:
 *     summary: Get all Traits
 *     description: Retrieve a list of Traits with pagination.
 *     tags: [Traits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hidden
 *         schema:
 *           type: boolean
 *         description: Filter by hidden traits
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
 *         description: Maximum number of Traits per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of Traits retrieved successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router
  .route('/')
  .post(auth('manageTraits'), validate(traitValidation.createTrait), traitController.createTrait)
  .get(auth('getTraits'), traitController.getTraits);

/**
 * @swagger
 * /traits/{traitId}:
 *   get:
 *     summary: Get a specific Trait by ID
 *     description: Retrieve detailed information about a Trait.
 *     tags: [Traits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: traitId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Trait details retrieved successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Trait
 *     description: Modify the details of a Trait.
 *     tags: [Traits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: traitId
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
 *               hidden:
 *                 type: boolean
 *                 description: Whether the trait is hidden
 *               description:
 *                 type: string
 *                 description: Description of the trait
 *               effect:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       "200":
 *         description: Trait updated successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Trait
 *     description: Remove a Trait from the database.
 *     tags: [Traits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: traitId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Trait deleted successfully
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
router
  .route('/:traitId')
  .get(auth('getTraits'), validate(traitValidation.getTrait), traitController.getTrait)
  .patch(auth('manageTraits'), validate(traitValidation.updateTrait), traitController.updateTrait)
  .delete(auth('manageTraits'), validate(traitValidation.deleteTrait), traitController.deleteTrait);

module.exports = router;
