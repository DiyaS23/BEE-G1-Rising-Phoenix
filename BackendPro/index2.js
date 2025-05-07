const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
require('dotenv').config();
const fs = require("fs");
const { readData, writeData } = require("./file");
const movies = require("./movies.json");

const app = express();  // Declare app first
app.use(cors());  // Then use cors middleware

const port = 3002;

app.use(express.json());

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

// Admin-only Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// User Registration (public)
const bcrypt = require("bcrypt");
app.post("/users", async (req, res) => {
  const users = readData("users");
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is salt rounds
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
  const newUser = { id: maxId + 1, username: req.body.username, password: hashedPassword, role: "user" };
  users.push(newUser);
  writeData("users", users);
  res.status(201).json({ message: "User registered!", user: newUser });
});

// User Login (public)
app.post("/login", async(req, res) => {
  const { username, password } = req.body;
  const users = readData("users");
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username , role: user.role},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );


  res.json({ message: "Login successful", token , userId: user.id, role: user.role});
});

// Welcome message
app.get("/", (req, res) => {
  res.send("Welcome to MovieVerse API!");
});
//Admin endpoints
app.get("/admin/summary", authenticateJWT, isAdmin, (req, res) => {
  const users = readData("users").length;
  const movies = readData("movies").length;
  const reviews = readData("reviews").length;
  const watchlists = readData("watchlists").length;
  const favorites = readData("favorites").length;

  res.json({ users, movies, reviews, watchlists, favorites });
});


// USERS (protected)
app.get("/users", authenticateJWT, isAdmin,(req, res) => {
  res.json(readData("users"));
});

app.get("/users/:id", authenticateJWT, isAdmin, (req, res) => {
  const user = readData("users").find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).json({ message: "User not found!" });
});

app.put("/users/:id", authenticateJWT, isAdmin, (req, res) => {
  let users = readData("users");
  let index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeData("users", users);
    res.json({ message: "User updated!", user: users[index] });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});
app.put("/users/:id/password", authenticateJWT, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  // Only allow user to update their own password or admin
  if (req.user.userId != id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  let users = readData("users");
  let index = users.findIndex(u => u.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "User not found!" });
  }

  const user = users[index];

  // If not admin, verify old password
  if (req.user.role !== "admin") {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }
  }

  // Hash new password and save
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  users[index].password = hashedNewPassword;

  writeData("users", users);
  res.json({ message: "Password updated successfully!" });
});

app.delete("/users/:id", authenticateJWT,  isAdmin,(req, res) => {
  let users = readData("users");
  let newUsers = users.filter(u => u.id != req.params.id);
  if (newUsers.length !== users.length) {
    writeData("users", newUsers);
    res.json({ message: "User deleted!" });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

// MOVIES (protected)
app.post("/movies", authenticateJWT, isAdmin, (req, res) => {
  const movies = readData("movies");
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  writeData("movies", movies);
  res.status(201).json({ message: "Movie added!", movie: newMovie });
});

app.get("/movies", (req, res) => {
  res.json(readData("movies"));
});
// PUBLIC MOVIES (no authentication)
app.get("/public-movies", (req, res) => {
  try {
    const movies = readData("movies");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies." });
  }
});

app.get("/movies/:id", authenticateJWT, (req, res) => {
  const movie = readData("movies").find(m => m.id == req.params.id);
  movie ? res.json(movie) : res.status(404).json({ message: "Movie not found!" });
});

app.put("/movies/:id", authenticateJWT, isAdmin,(req, res) => {
  let movies = readData("movies");
  let index = movies.findIndex(m => m.id == req.params.id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...req.body };
    writeData("movies", movies);
    res.json({ message: "Movie updated!", movie: movies[index] });
  } else {
    res.status(404).json({ message: "Movie not found!" });
  }
});

app.delete("/movies/:id", authenticateJWT,isAdmin, (req, res) => {
  let movies = readData("movies");
  let newMovies = movies.filter(m => m.id != req.params.id);
  if (newMovies.length !== movies.length) {
    writeData("movies", newMovies);
    res.json({ message: "Movie deleted!" });
  } else {
    res.status(404).json({ message: "Movie not found!" });
  }
});


// WATCHLISTS (protected)
app.post("/watchlists", authenticateJWT, (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.userId; // Assuming you store userId in the token

  const watchlist = readData("watchlists");

  // Check if the movie is already in the watchlist
  const existingWatchlist = watchlist.find(wl => wl.userId === userId && wl.movieId === movieId);

  if (existingWatchlist) {
    return res.status(400).json({ message: "Movie is already in your watchlist." });
  }

  const newWatchlistItem = { id: watchlist.length + 1, userId, movieId };
  watchlist.push(newWatchlistItem);
  writeData("watchlists", watchlist);

  res.status(201).json({ message: "Movie added to watchlist!" });
});

// GET all watchlists (admin only)
app.get("/watchlists/admin-all", authenticateJWT, isAdmin, (req, res) => {
  const watchlists = readData("watchlists");
  const movies = readData("movies");
  const users = readData("users");

  // Group watchlists by userId
  const groupedByUser = {};

  watchlists.forEach(item => {
    const user = users.find(u => u.id === item.userId);
    const movie = movies.find(m => m.id === item.movieId);

    if (!groupedByUser[item.userId]) {
      groupedByUser[item.userId] = {
        userId: item.userId,
        username: user?.username || 'Unknown',
        watchlists: [],
      };
    }

    groupedByUser[item.userId].watchlists.push({
      watchlistId: item.id,
      movie: movie || null,
    });
  });

  // Convert grouped object to array
  const result = Object.values(groupedByUser);
  res.json(result);
});


app.get("/watchlists", authenticateJWT, (req, res) => {
  const watchlist = readData("watchlists");
  const movies = readData("movies");
  const userWatchlist = watchlist.filter(wl => wl.userId === req.user.userId);
  const enrichedWatchlist = userWatchlist.map(item => {
    const movie = movies.find(m => m.id === item.movieId);
    return {
      watchlistId: item.id,
      userId: item.userId,
      movie: movie || null
    };
  });
  res.json(enrichedWatchlist);
});
app.get("/watchlists/:userId", authenticateJWT, (req, res) => {
  const watchlist = readData("watchlists");
  const movies = readData("movies");
  const userId = req.params.userId;  // Extract userId from URL params

  // Filter the watchlist by the userId from the URL
  const userWatchlist = watchlist.filter(wl => wl.userId === Number(userId));

  // Map the filtered watchlist and return the enriched movie data
  const enrichedWatchlist = userWatchlist.map(item => {
    const movie = movies.find(m => m.id === item.movieId);
    return {
      watchlistId: item.id,  // Use 'watchlistId' to match the previous convention
      movie: movie || null    // Include movie data (or null if not found)
    };
  });

  res.json(enrichedWatchlist);
});

app.put("/watchlists/:id", authenticateJWT, (req, res) => {
  let watchlist = readData("watchlists");
  let index = watchlist.findIndex(m => m.id == req.params.id);
  if (index !== -1) {
    watchlist[index] = { ...watchlist[index], ...req.body };
    writeData("watchlists", watchlist);
    res.json({ message: "Watchlist entry updated!", entry: watchlist[index] });
  } else {
    res.status(404).json({ message: "Entry not found!" });
  }
});

app.delete("/watchlists/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const watchlist = readData("watchlists");
  const updatedWatchlist = watchlist.filter(wl => !(wl.id === parseInt(id) && wl.userId === userId));

  if (updatedWatchlist.length === watchlist.length) {
    return res.status(404).json({ message: "Watchlist item not found!" });
  }

  writeData("watchlists", updatedWatchlist);
  res.json({ message: "Movie removed from watchlist." });
});

app.delete("/watchlists", authenticateJWT, (req, res) => {
  const watchlist = readData("watchlists");
const updatedWatchlist = watchlist.filter(wl => wl.userId !== req.user.userId);
writeData("watchlists", updatedWatchlist);
res.json({ message: "Your watchlist cleared!" });

});
app.delete("/watchlists/admin/:id", authenticateJWT, isAdmin, (req, res) => {
  let watchlist = readData("watchlists");
  let newWatchlist = watchlist.filter(wl => wl.id != req.params.id);
  
  if (newWatchlist.length === watchlist.length) {
    return res.status(404).json({ message: "Watchlist item not found!" });
  }

  writeData("watchlists", newWatchlist);
  res.json({ message: "Watchlist item deleted by admin!" });
});

// FAVORITES (protected)
app.post("/favorites", authenticateJWT, (req, res) => {
    const { movieId } = req.body;
    const userId = req.user.userId; // Assuming you store userId in the token
  
    const favorites = readData("favorites");
  
    // Check if movie is already in favorites
    const existingFavorite = favorites.find(fav => fav.userId === userId && fav.movieId === movieId);
  
    if (existingFavorite) {
      return res.status(400).json({ message: "Movie is already in your favorites." });
    }
  
    const newFavorite = { id: favorites.length + 1, userId, movieId };
    favorites.push(newFavorite);
    writeData("favorites", favorites);
  
    res.status(201).json({ message: "Movie added to favorites!" });
  });
  app.get("/favorites", authenticateJWT, (req, res) => {
    const favorites = readData("favorites");
    const movies = readData("movies");
    const userFavorites = favorites
      .filter(f => f.userId === req.user.userId)
      .map(f => {
        const movie = movies.find(m => m.id === f.movieId);
        return { favoriteId: f.id, movie: movie || null };
      });
  
    res.json(userFavorites);
  });
  
  app.get("/favorites/:userId", authenticateJWT, (req, res) => {
    const favorites = readData("favorites");
    const movies = readData("movies");
    const userFavorites = favorites
      .filter(f => f.userId == Number(req.params.userId))
      .map(f => {
        const movie = movies.find(m => m.id == f.movieId);
        return { favoriteId: f.id, movie: movie || null };
      });
  
    res.json(userFavorites);
  });
  
  app.delete("/favorites/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
  
    const favorites = readData("favorites");
    const updatedFavorites = favorites.filter(fav => !(fav.id === parseInt(id) && fav.userId === userId));

  
    if (updatedFavorites.length === favorites.length) {
      return res.status(404).json({ message: "Favorite not found!" });
    }
  
    writeData("favorites", updatedFavorites);
    res.json({ message: "Movie removed from favorites." });
  });
  


// SEARCH & FILTER (protected)
app.get("/search", (req, res) => {
  const { title, releaseYear, genre, rating } = req.query;
  let movies = readData("movies");

  if (title) {
    movies = movies.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
  }
  if (releaseYear) {
    movies = movies.filter(m => m.releaseYear === parseInt(releaseYear));
  }
  if (genre) {
    movies = movies.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
  }
  if (rating) {
    movies = movies.filter(m => m.rating >= parseFloat(rating));
  }

  res.json(movies);
});

// REVIEWS (protected)
app.post("/reviews", authenticateJWT, (req, res) => {
  const reviews = readData("reviews");
  const newReview = { id: reviews.length + 1, userId: req.user.userId, ...req.body };
reviews.push(newReview);
writeData("reviews", reviews);
res.status(201).json({ message: "Review added!", review: newReview });

});

// GET all reviews (admin only)
app.get("/reviews", authenticateJWT, isAdmin, (req, res) => {
  const reviews = readData("reviews");
  const movies = readData("movies");
  const users = readData("users");

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});

  const grouped = {};

  reviews.forEach((review) => {
    const username = userMap[review.userId] || 'Unknown User';
    const movie = movies.find(m => m.id === Number(review.movieId));
    const enrichedReview = {
      reviewId: review.id,
      content: review.reviewText,
      rating: review.rating,
      movie: movie || null
    };

    if (!grouped[review.userId]) {
      grouped[review.userId] = {
        userId: review.userId,
        username,
        reviews: [enrichedReview],
      };
    } else {
      grouped[review.userId].reviews.push(enrichedReview);
    }
  });

  res.json(Object.values(grouped));
});



app.put("/reviews/:id", authenticateJWT, (req, res) => {
  let reviews = readData("reviews");
  let index = reviews.findIndex(r => r.id == req.params.id);
  if (index !== -1) {
    reviews[index] = { ...reviews[index], ...req.body };
    writeData("reviews", reviews);
    res.json({ message: "Review updated!", review: reviews[index] });
  } else {
    res.status(404).json({ message: "Review not found!" });
  }
});

app.delete("/reviews/:id", authenticateJWT, (req, res) => {
  let reviews = readData("reviews");
  let newReviews = reviews.filter(r => r.id != req.params.id);
  writeData("reviews", newReviews);
  res.json({ message: "Review deleted!" });
});


// DELETE review
app.delete("/reviews/:id", authenticateJWT, isAdmin, (req, res) => {
  const { id } = req.params;
  const reviews = readData("reviews");
  const updatedReviews = reviews.filter(review => review.id !== parseInt(id));

  if (updatedReviews.length === reviews.length) {
    return res.status(404).json({ message: "Review not found!" });
  }

  writeData("reviews", updatedReviews);
  res.json({ message: "Review deleted successfully!" });
});


// TOP-RATED MOVIES (protected)
app.get("/movies-top-rated", authenticateJWT, (req, res) => {
  const reviews = readData("reviews");
  const movies = readData("movies");
  const ratingsMap = {};

  reviews.forEach(r => {
    if (!ratingsMap[r.movieId]) {
      ratingsMap[r.movieId] = [];
    }
    ratingsMap[r.movieId].push(r.rating);
  });

  const averageRatings = movies.map(movie => {
    const ratings = ratingsMap[movie.id] || [];
    const average = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;
    return { ...movie, averageRating: average.toFixed(1) };
  });

  const sortedMovies = averageRatings.sort((a, b) => b.averageRating - a.averageRating);
  const limit = parseInt(req.query.limit) || 4;

  res.json(sortedMovies.slice(0, limit));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
