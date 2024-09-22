const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1')
 
routes.get('/', lesson1Controller.dalanRoute);
routes.get('/lily', lesson1Controller.lilyRoute);

module.exports = routes;