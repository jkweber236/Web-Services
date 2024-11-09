const express = require('express');
const router = express.Router();

const exercisesController = require('../controllers/exercises');
const validation = require('../middleware/validate');
const requiresAuth = require('../middleware/requiresAuth');

router.get('/', requiresAuth(), exercisesController.getAllExercises);
router.get('/:id', requiresAuth(), exercisesController.getExercise);
router.post('/',  requiresAuth(), validation.saveExercise, exercisesController.createExercise);
router.put('/:id', requiresAuth(), validation.saveExercise, exercisesController.updateExercise);
router.delete('/:id', requiresAuth(), exercisesController.deleteExercise);

module.exports = router;