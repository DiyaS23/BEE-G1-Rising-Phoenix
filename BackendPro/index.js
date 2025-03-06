const express = require("express");
const fs=require("fs");
const { readData, writeData } = require("./file");
const movies = require("./movies.json");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to MovieVerse API!");
});

// USERS CRUD
app.post("/users", (req, res) => {
    const users = readData("users");
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    writeData("users", users);
    res.status(201).json({ message: "User registered!", user: newUser });
  });
  
  app.get("/users", (req, res) => {
    res.json(readData("users"));
  });
  
  app.get("/users/:id", (req, res) => {
    const user = readData("users").find((u) => u.id == req.params.id);
    user ? res.json(user) : res.status(404).json({ message: "User not found!" });
  });
  
  app.put("/users/:id", (req, res) => {
    let users = readData("users");
    let index = users.findIndex((u) => u.id == req.params.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      writeData("users", users);
      res.json({ message: "User updated!", user: users[index] });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
  
  app.delete("/users/:id", (req, res) => {
    let users = readData("users");
    let newUsers = users.filter((u) => u.id != req.params.id);
    if (newUsers.length !== users.length) {
      writeData("users", newUsers);
      res.json({ message: "User deleted!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
  
  // MOVIES CRUD
  app.post("/movies", (req, res) => {
    const movies = readData("movies");
    const newMovie = { id: movies.length + 1, ...req.body };
    movies.push(newMovie);
    writeData("movies", movies);
    res.status(201).json({ message: "Movie added!", movie: newMovie });
  });
  
  app.get("/movies", (req, res) => {
    res.json(readData("movies"));
  });
  
  app.get("/movies/:id", (req, res) => {
    const movie = readData("movies").find((m) => m.id == req.params.id);
    movie ? res.json(movie) : res.status(404).json({ message: "Movie not found!" });
  });
  
  app.put("/movies/:id", (req, res) => {
    let movies = readData("movies");
    let index = movies.findIndex((m) => m.id == req.params.id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...req.body };
      writeData("movies", movies);
      res.json({ message: "Movie updated!", movie: movies[index] });
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  });
  
  app.delete("/movies/:id", (req, res) => {
    let movies = readData("movies");
    let newMovies = movies.filter((m) => m.id != req.params.id);
    if (newMovies.length !== movies.length) {
      writeData("movies", newMovies);
      res.json({ message: "Movie deleted!" });
    } else {
      res.status(404).json({ message: "Movie not found!" });
    }
  });
  // WATCHLIST CRUD
  app.post("/watchlists", (req, res) => {
    const watchlist = readData("watchlists");
    watchlist.push(req.body);
    writeData("watchlists", watchlist);
    res.status(201).json({ message: "Movie added to watchlist!" });
  });
  
  app.get("/watchlists", (req, res) => {
    const watchlist = readData("watchlists"); 
    const movies = readData("movies"); 
    const enrichedWatchlist = watchlist.map(item => {
        const movie = movies.find(m => m.id === item.movieId);
        return {
            userId: item.userId,
            movie: movie || null 
        };
    });

    res.json(enrichedWatchlist);
});

  
  app.put("/watchlists/:id", (req, res) => {
    let watchlist = readData("watchlists");
    let index = watchlist.findIndex((m) => m.id == req.params.id);
    if (index !== -1) {
      watchlist[index] = { ...watchlist[index], ...req.body };
      writeData("watchlists", watchlist);
      res.json({ message: "Watchlist entry updated!", entry: watchlist[index] });
    } else {
      res.status(404).json({ message: "Entry not found!" });
    }
  });
  
  app.delete("/watchlists/user/:userId", (req, res) => {
    let watchlist = readData("watchlists");
    let newWatchlist = watchlist.filter((m) => m.userId != req.params.userId);
    writeData("watchlists", newWatchlist);
    res.json({ message: "Watchlist cleared for user!" });
  });
  
  app.delete("/watchlists", (req, res) => {
    writeData("watchlists", []);
    res.json({ message: "Watchlist cleared!" });
  });
  
  // REVIEWS CRUD
  app.post("/reviews", (req, res) => {
    const reviews = readData("reviews");
    reviews.push(req.body);
    writeData("reviews", reviews);
    res.status(201).json({ message: "Review added!" });
  });
  
  app.get("/reviews", (req, res) => {
    res.json(readData("reviews"));
  });
  
  app.put("/reviews/:id", (req, res) => {
    let reviews = readData("reviews");
    let index = reviews.findIndex((r) => r.id == req.params.id);
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...req.body };
      writeData("reviews", reviews);
      res.json({ message: "Review updated!", review: reviews[index] });
    } else {
      res.status(404).json({ message: "Review not found!" });
    }
  });
  
  app.delete("/reviews/:id", (req, res) => {
    let reviews = readData("reviews");
    let newReviews = reviews.filter((r) => r.id != req.params.id);
    writeData("reviews", newReviews);
    res.json({ message: "Review deleted!" });
  });   
  
  // Search CRUD
const getMovies = () => {
    const data = fs.readFileSync("movies.json");
    return JSON.parse(data);
  };
  app.get("/search", (req, res) => {
    const { title, releaseYear, genre, rating } = req.query;
    let movies = getMovies();
  
    if (title) {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    if (releaseYear) {
      movies = movies.filter(movie => movie.releaseYear === parseInt(releaseYear));
    }
    if (genre) {
      movies = movies.filter(movie =>
        movie.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    if (rating) {
      movies = movies.filter(movie => movie.rating >= parseFloat(rating));
    }
  
    res.json(movies);
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
