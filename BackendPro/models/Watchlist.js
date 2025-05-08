const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", // assuming you have a Movie model
    required: true
  }
});

module.exports = mongoose.model("Watchlist", watchlistSchema);