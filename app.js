const express = require('express');
const http = require('http');

const app = express();

const routes = [
  'auth',
];

routes.forEach(route => {
  app.use(`/${route}`, require(`./controllers/${route}`));
});

module.exports = app;
