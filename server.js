const http = require('http');
const app = require('./app');
const env = require('./env');

http.createServer(app).listen(env.server.port, env.server.host);
