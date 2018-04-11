const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const env = require('./env');
const http = require('http');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

// middlewares

app.use(bodyParser.json());
app.use(cors({
  origin: env.client.url,
  credentials: true
}));

app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use(session({ 
  store: new RedisStore(env.redis),
  secret: 'tigger',
})); 

// top-level routes

const routes = [
  'auth',
];

routes.forEach(route => {
  app.use(`/${route}`, require(`./controllers/${route}`));
});

module.exports = app;
