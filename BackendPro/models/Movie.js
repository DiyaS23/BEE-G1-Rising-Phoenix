const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  releaseYear: Number,
  rating: Number,
  posterUrl: String,
  trailerUrl: String,
});

module.exports = mongoose.model("Movie", movieSchema);