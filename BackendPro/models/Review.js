const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // 👈 Must match the model name
        required: true,
      },
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',  // 👈 Must match the model name
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      }
});

module.exports = mongoose.model("Review", reviewSchema);