const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/users');
const movies = require('./routes/movies');
const checkJWT = require('./routes/checkJWT');
const { verifyJWT } = require('./security/auth');
const {
  host, port, db, APP_PORT, allowedOrigins,
} = require('./config');

const app = express();

/**
 * CORS
 */
app.use(cors({
  origin(origin, callback) {
    const even = allowedOrigins.some(element => element === origin);
    callback(null, even);
  },
  preflightContinue: true,
  optionsSuccessStatus: 200,
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
  *Routes without JWT check
 */
app.use('/api/users', users);
app.use('/api/movies', movies);
/**
 * JWT middleware
 */

app.use(verifyJWT);

/**
 * Routes with JWT-check
 */

app.use('api/checkJWT', checkJWT);

/**
 * Start app
 */

mongoose.connect(`mongodb://${host}:${port}/${db}`)
  .then(() => {
    app.listen(APP_PORT, () => {
      console.info(`App listening on port ${APP_PORT}!`);
    });
  });

module.exports = app;
