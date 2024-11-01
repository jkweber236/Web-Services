const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { auth, requiresAuth } = require('express-openid-connect');

const port = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/users', requiresAuth(), (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'An error occurred', error: err });
    });
});

app.use('/', require('./routes'));


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});