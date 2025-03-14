const express = require('express');
const validate = require('../middlewares/validate');
const crisisValidation = require('../validations/crisis.validation');
const crisisController = require('../controllers/crisis.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(crisisValidation.createCrisis), crisisController.createCrisis)
  .get(validate(crisisValidation.getCrises), crisisController.getCrises);

router
  .route('/:crisisId')
  .get(validate(crisisValidation.getCrisis), crisisController.getCrisis)
  .patch(validate(crisisValidation.updateCrisis), crisisController.updateCrisis)
  .delete(validate(crisisValidation.deleteCrisis), crisisController.deleteCrisis);

module.exports = router;
