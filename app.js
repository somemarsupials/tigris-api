const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

const app = express();

// middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// top-level routes

const routes = [
  'auth',
];

routes.forEach(route => {
  app.use(`/${route}`, require(`./controllers/${route}`));
});

module.exports = app;
