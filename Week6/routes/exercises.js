const express = require('express');
const router = express.Router();

const exercisesController = require('../controllers/exercises');
const validation = require('../middleware/validate');

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getExercise);
router.post('/',  validation.saveExercise, exercisesController.createExercise);
router.put('/:id', validation.saveExercise, exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;