const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllExercises = async (req, res, next) => {
  const result = await mongodb.getDb().db('FitnessTracker').collection('exercises').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getExercise = async (req, res, next) => {
  const exerciseId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('FitnessTracker')
    .collection('exercises')
    .find({ _id: exerciseId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createExercise = async (req, res) => {
  const exercise = {
    name: req.body.name,
    type: req.body.type,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    duration: req.body.duration
  };
  const response = await mongodb.getDb().db('FitnessTracker').collection('exercises').insertOne(exercise);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Unable to add exercise.');
  }
};

const updateExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id)
  const exercise = {
    name: req.body.name,
    type: req.body.type,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    duration: req.body.duration
  };
  const response = await mongodb.getDb().db('FitnessTracker').collection('exercises').replaceOne({_id: exerciseId }, exercise);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Unable to update exercise.');
  }
};

const deleteExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id)
  const response = await mongodb.getDb().db('FitnessTracker').collection('exercises').deleteOne({ _id: exerciseId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Unable to delete exercise.');
  }
};

module.exports = { getAllExercises, getExercise, createExercise, updateExercise, deleteExercise };