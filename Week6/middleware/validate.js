const validator = require('../helpers/validate');

const saveExercise = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    type: 'required|string',
    sets: 'numeric|nullable',
    reps: 'numeric|nullable',
    weight: 'numeric|nullable',
    duration: 'string|nullable'
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
    date: 'required|string',
    duration: 'required|string',
    type: 'required|string',
    caloriesBurned: 'numeric|nullable',
    exercises: 'required|array',
    'exercises.*.name': 'required|string',
    'exercises.*.type': 'required|string',
    'exercises.*.sets': 'numeric|nullable',
    'exercises.*.reps': 'numeric|nullable',
    'exercises.*.weight': 'numeric|nullable',
    'exercises.*.duration': 'string|nullable',
   notes: 'string|nullable'
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