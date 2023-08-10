const express = require('express');

const routes = require('./routes/router');

const app = express();

app.use(express.json());
routes(app);

module.exports = app;