const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const crisisValidation = require('../../validations/crisis.validation');
const crisisController = require('../../controllers/crisis.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCrises'), validate(crisisValidation.createCrisis), crisisController.createCrisis)
  .get(auth('getCrises'), crisisController.getCrises);

router
  .route('/:crisisId')
  .get(auth('getCrises'), validate(crisisValidation.getCrisis), crisisController.getCrisis)
  .patch(auth('manageCrises'), validate(crisisValidation.updateCrisis), crisisController.updateCrisis)
  .delete(auth('manageCrises'), validate(crisisValidation.deleteCrisis), crisisController.deleteCrisis);

module.exports = router;
