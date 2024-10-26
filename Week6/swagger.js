const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Fitness Tracker API'
  },
  // host: 'web-services-w06.onrender.com',
  // schemes: ['https']
  host: "localhost:8080",
  basePath: "/",
  schemes: ["http"],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
