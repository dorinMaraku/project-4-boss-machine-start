const express = require('express');
const minionsApi = require('./routes/minionsApi');
const ideasApi = require('./routes/ideasApi');
const meetingsApi = require('./routes/meetingsApi');
const apiRouter = express.Router();

apiRouter.use('/minions', minionsApi)
apiRouter.use('/ideas', ideasApi)
apiRouter.use('/meetings', meetingsApi)

module.exports = apiRouter;
