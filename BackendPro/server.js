const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");
const Movie = require("./models/Movie");
const Review = require("./models/Review");
const Watchlist = require("./models/Watchlist");
const Favorite = require("./models/Favorite");

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Access denied." });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: "Admins only." });
  next();
};

// Register new user and save to MongoDB
app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ username: req.body.username, password: hashedPassword });
    await newUser.save(); // ✅ SAVES TO MONGO
    res.status(201).json({ message: "User registered!", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});
// User Login (MongoDB)
app.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username , role: user.role},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: "Login successful", token , userId: user._id, role: user.role });
});

// Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to MovieVerse API!");
});

// Admin Summary (MongoDB)
app.get("/admin/summary", authenticateJWT, isAdmin, async (req, res) => {
  const users = await User.countDocuments();
  const movies = await Movie.countDocuments();
  const reviews = await Review.countDocuments();
  const watchlists = await Watchlist.countDocuments();
  const favorites = await Favorite.countDocuments();
  res.json({ users, movies, reviews, watchlists, favorites });
});

// USERS (MongoDB)
app.get("/users", authenticateJWT, isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/users/:id", authenticateJWT, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found!" });
});

app.put("/users/:id", authenticateJWT, isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  user ? res.json({ message: "User updated!", user }) : res.status(404).json({ message: "User not found!" });
});

app.put("/users/:id/password", authenticateJWT, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  if (req.user.userId != id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found!" });

  if (req.user.role !== "admin") {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect." });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();

  res.json({ message: "Password updated successfully!" });
});

app.delete("/users/:id", authenticateJWT, isAdmin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  user ? res.json({ message: "User deleted!" }) : res.status(404).json({ message: "User not found!" });
});

// MOVIES (MongoDB)
app.post("/movies", authenticateJWT, isAdmin, async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json({ message: "Movie added!", movie });
});

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get("/public-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies." });
  }
});

app.get("/movies/:id", authenticateJWT, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  movie ? res.json(movie) : res.status(404).json({ message: "Movie not found!" });
});

app.put("/movies/:id", authenticateJWT, isAdmin, async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  movie ? res.json({ message: "Movie updated!", movie }) : res.status(404).json({ message: "Movie not found!" });
});

app.delete("/movies/:id", authenticateJWT, isAdmin, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  movie ? res.json({ message: "Movie deleted!" }) : res.status(404).json({ message: "Movie not found!" });
});


app.post("/watchlists", authenticateJWT, async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.userId;
  const existing = await Watchlist.findOne({ userId, movieId });
  if (existing) return res.status(400).json({ message: "Movie is already in your watchlist." });
  const item = new Watchlist({ userId, movieId });
  await item.save();
  res.status(201).json({ message: "Movie added to watchlist!" });
});

// Admin: all watchlists grouped by user
app.get("/watchlists/admin-all", authenticateJWT, isAdmin, async (req, res) => {
  const watchlists = await Watchlist.find().populate("movieId").populate("userId");
  const grouped = {};
  watchlists.forEach(item => {
    const uid = item.userId._id.toString();
    if (!grouped[uid]) {
      grouped[uid] = {
        userId: uid,
        username: item.userId.username,
        watchlists: []
      };
    }
    grouped[uid].watchlists.push({
      watchlistId: item._id,
      movie: item.movieId
    });
  });
  res.json(Object.values(grouped));
});

// User's own watchlist
app.get("/watchlists", authenticateJWT, async (req, res) => {
  const userId = req.user.userId;
  const list = await Watchlist.find({ userId }).populate('movieId');
  res.json(list.map(w => ({
    watchlistId: w._id,
    movie: w.movieId
  })));
});

// Watchlist by user ID (admin or self)
app.get("/watchlists/:userId", authenticateJWT, async (req, res) => {
  const userId = req.params.userId;
  const list = await Watchlist.find({ userId }).populate("movieId");
  res.json(list.map(w => ({
    watchlistId: w._id,
    movie: w.movieId
  })));
});

// Update a watchlist item
app.put("/watchlists/:id", authenticateJWT, async (req, res) => {
  const updated = await Watchlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (updated) {
    res.json({ message: "Watchlist entry updated!", entry: updated });
  } else {
    res.status(404).json({ message: "Entry not found!" });
  }
});

// Delete one from watchlist
app.delete("/watchlists/:id", authenticateJWT, async (req, res) => {
  const result = await Watchlist.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!result) return res.status(404).json({ message: "Watchlist item not found!" });
  res.json({ message: "Movie removed from watchlist." });
});

// Clear own watchlist
app.delete("/watchlists", authenticateJWT, async (req, res) => {
  await Watchlist.deleteMany({ userId: req.user.userId });
  res.json({ message: "Your watchlist cleared!" });
});

// Admin delete any watchlist item
app.delete("/watchlists/admin/:id", authenticateJWT, isAdmin, async (req, res) => {
  const result = await Watchlist.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: "Watchlist item not found!" });
  res.json({ message: "Watchlist item deleted by admin!" });
});

// FAVORITES (protected)

// Add to favorites
app.post("/favorites", authenticateJWT, async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.userId;
  const existing = await Favorite.findOne({ userId, movieId });
  if (existing) return res.status(400).json({ message: "Movie is already in your favorites." });
  const favorite = new Favorite({ userId, movieId });
  await favorite.save();
  res.status(201).json({ message: "Movie added to favorites!" });
});

// Get current user's favorites
app.get("/favorites", authenticateJWT, async (req, res) => {
  const items = await Favorite.find({ userId: req.user.userId }).populate("movieId");
  const formatted = items.map(fav => ({ favoriteId: fav._id, movie: fav.movieId }));
  res.json(formatted);
});

// Get favorites by user ID (admin or user)
app.get("/favorites/:userId", authenticateJWT, async (req, res) => {
  const userId = req.params.userId;
  const items = await Favorite.find({ userId }).populate("movieId");
  const formatted = items.map(fav => ({ favoriteId: fav._id, movie: fav.movieId }));
  res.json(formatted);
});

// Delete favorite
app.delete("/favorites/:id", authenticateJWT, async (req, res) => {
  const result = await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!result) return res.status(404).json({ message: "Favorite not found!" });
  res.json({ message: "Movie removed from favorites." });
});



// SEARCH & FILTER (protected)
app.get("/search", async (req, res) => {
  const { title, releaseYear, genre, rating } = req.query;
  const query = {};

  if (title) {
    query.title = new RegExp(title, "i"); // case-insensitive search
  }
  if (releaseYear) {
    query.releaseYear = parseInt(releaseYear);
  }
  if (genre) {
    query.genre = new RegExp(genre, "i"); // flexible genre match
  }
  if (rating) {
    query.rating = { $gte: parseFloat(rating) };
  }

  try {
    const results = await Movie.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
});
// REVIEWS (protected)
app.post("/reviews", authenticateJWT, async (req, res) => {
  try {
    const newReview = new Review({
      userId: req.user.userId,
      ...req.body,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added!", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

// GET all reviews (admin only)
app.get("/reviews", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'username')  // Populate user details (like username)
      .populate('movieId', 'title');   // Populate movie details (like title)

    const grouped = {};

    reviews.forEach((review) => {
      const username = review.userId.username || 'Unknown User';
      const movie = review.movieId;
      const enrichedReview = {
        reviewId: review._id,
        content: review.reviewText,
        rating: review.rating,
        movie: movie || null
      };

      if (!grouped[review.userId._id]) {
        grouped[review.userId._id] = {
          userId: review.userId._id,
          username,
          reviews: [enrichedReview],
        };
      } else {
        grouped[review.userId._id].reviews.push(enrichedReview);
      }
    });

    res.json(Object.values(grouped));
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// PUT - Update Review
app.put("/reviews/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (updatedReview) {
      res.json({ message: "Review updated!", review: updatedReview });
    } else {
      res.status(404).json({ message: "Review not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
});

// DELETE - Delete Review
app.delete("/reviews/:id", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (deletedReview) {
      res.json({ message: "Review deleted successfully!" });
    } else {
      res.status(404).json({ message: "Review not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
});

// TOP-RATED MOVIES (protected)
app.get("/movies-top-rated", authenticateJWT, async (req, res) => {
  try {
    const reviews = await Review.find();
    const movies = await Movie.find();
    
    const ratingsMap = {};

    reviews.forEach((r) => {
      if (!ratingsMap[r.movieId]) {
        ratingsMap[r.movieId] = [];
      }
      ratingsMap[r.movieId].push(r.rating);
    });

    const averageRatings = movies.map((movie) => {
      const ratings = ratingsMap[movie._id] || [];
      const average = ratings.length
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
      return { ...movie.toObject(), averageRating: average.toFixed(1) };
    });

    const sortedMovies = averageRatings.sort((a, b) => b.averageRating - a.averageRating);
    const limit = parseInt(req.query.limit) || 4;

    res.json(sortedMovies.slice(0, limit));
  } catch (error) {
    res.status(500).json({ message: "Error fetching top-rated movies", error });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});