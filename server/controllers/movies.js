const Movie = require('../models/movie');
const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require('../constants');

async function getMovies(req, res) {
  try {
    const result = await Movie.getMovies(req.query);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ result });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

module.exports = { getMovies };
