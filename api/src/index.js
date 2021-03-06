const Express = require('express');
const cors = require('cors');
const v1 = require('./routes/v1');
require('./db');

const app = Express();

app.use(cors())
app.use('/v1', v1);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;