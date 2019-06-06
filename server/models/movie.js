const mongoose = require('mongoose');

const schema = mongoose.Schema({
  film_id: mongoose.Schema.Types.ObjectId,
  name: String,
  image_URI: String,
  release_year: Number,
  genres: [String],
  current_rate: Number,
  duration: Number,
  age_restriction: Number,
  description: String,
  producer: String,
});

const Movie = mongoose.model('Movie', schema);

async function getMovies(query) {
  if (!Object.values(query)[0]) {
    return await Movie.find();
  }
  try {
    return await Movie.find(query);
  } catch (error) {
    return error;
  }
}

module.exports = { getMovies };
