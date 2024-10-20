const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllWorkouts = async (req, res, next) => {
  const result = await mongodb.getDb().db('FitnessTracker').collection('workouts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getWorkout = async (req, res, next) => {
  const workoutId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('FitnessTracker')
    .collection('workouts')
    .find({ _id: workoutId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createWorkout = async (req, res) => {
  const workout = {
    name: req.body.name,
    date: req.body.date,
    duration: req.body.duration,
    type: req.body.type,
    caloriesBurned: req.body.caloriesBurned,
    exercises: req.body.exercises,
    notes: req.body.notes
  };
  const response = await mongodb.getDb().db('FitnessTracker').collection('workouts').insertOne(workout);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Unable to add workout.');
  }
};

const updateWorkout = async (req, res) => {
  const workoutId = new ObjectId(req.params.id)
  const workout = {
    name: req.body.name,
    date: req.body.date,
    duration: req.body.duration,
    type: req.body.type,
    caloriesBurned: req.body.caloriesBurned,
    exercises: req.body.exercises,
    notes: req.body.notes
  };
  const response = await mongodb.getDb().db('FitnessTracker').collection('workouts').replaceOne({_id: workoutId }, workout);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Unable to update workout.');
  }
};

const deleteWorkout = async (req, res) => {
  const workoutId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db('FitnessTracker').collection('workouts').deleteOne({ _id: workoutId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Unable to delete workout.');
  }
};

module.exports = { getAllWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };