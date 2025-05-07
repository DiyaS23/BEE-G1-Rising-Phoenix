import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlists';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';  // Navbar import
import Signup from './pages/Signup';
import ManageMovies from './pages/ManageMovies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import MovieDetails from './components/MovieDetails';
import ManageWatchlists from './pages/ManageWatchlists';
import ManageUsers from './pages/ManageUsers';
import ManageReviews from './pages/ManageReviews';


function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route path="/search" element={<SearchResults />} />
        {/* Admin-only pages */}
        <Route path="/manage-movies" element={<ManageMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/manage-watchlists" element={<ManageWatchlists />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-reviews" element={<ManageReviews />} />
      </Routes>
    </Router>
  );
}

export default App;
