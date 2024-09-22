const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1')
 
routes.get('/', lesson1Controller.dalanRoute);
routes.get('/lily', lesson1Controller.lilyRoute);
routes.get('/lorinda', lesson1Controller.lorindaRoute);
routes.get('/brad', lesson1Controller.bradRoute);

module.exports = routes;