const validator = require('../helpers/validate');

const saveExercise = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    type: 'required|string',
    sets: 'numeric',
    reps: 'numeric',
    weight: 'numeric',
    duration: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Exercise validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveWorkout = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    date: 'required|date_format',
    duration: 'required|string',
    type: 'required|string',
    caloriesBurned: 'numeric',
    exercises: 'required|array',
    'exercises.*.name': 'required|string',
    'exercises.*.type': 'required|string',
    'exercises.*.sets': 'numeric',
    'exercises.*.reps': 'numeric',
    'exercises.*.weight': 'numeric',
    'exercises.*.duration': 'string',
   notes: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Workout validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveExercise, saveWorkout
};