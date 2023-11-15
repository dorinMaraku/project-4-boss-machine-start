const express = require('express');
const minionsApi = require('./routes/minionsApi');
const apiRouter = express.Router();

apiRouter.use('/minions', minionsApi)

module.exports = apiRouter;
