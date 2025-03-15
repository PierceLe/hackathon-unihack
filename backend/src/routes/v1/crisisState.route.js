const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const crisisStateValidation = require('../../validations/crisisState.validation');
const crisisStateController = require('../../controllers/crisisState.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCrises'), validate(crisisStateValidation.createCrisisState), crisisStateController.createCrisisState)
  .get(auth('getCrises'), crisisStateController.getCrisisStates);

router
  .route('/:crisisStateId')
  .get(auth('getCrises'), validate(crisisStateValidation.getCrisisState), crisisStateController.getCrisisState)
  .patch(auth('manageCrises'), validate(crisisStateValidation.updateCrisisState), crisisStateController.updateCrisisState)
  .delete(auth('manageCrises'), validate(crisisStateValidation.deleteCrisisState), crisisStateController.deleteCrisisState);

module.exports = router;
