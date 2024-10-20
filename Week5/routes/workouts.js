const express = require('express');
const router = express.Router();

const workoutsController = require('../controllers/workouts');

router.get('/', workoutsController.getAllWorkouts);
router.get('/:id', workoutsController.getWorkout);
router.post('/', workoutsController.createWorkout);
router.put('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;