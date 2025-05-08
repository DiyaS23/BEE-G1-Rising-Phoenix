import { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate} from 'react-router-dom';
import './ManageMovies.css';

function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get('http://localhost:3002/movies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.delete(`http://localhost:3002/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMovies(movies.filter((movie) => movie._id !== id));
        alert('Movie deleted successfully!');
      } catch (err) {
        alert('Failed to delete movie.');
      }
    }
  };

  if (role !== 'admin') {
    return <h2 className="no-permission-message">You do not have permission to manage movies.</h2>;
  }
  
  return (
    <div className="manage-movies-container">
      <h2>Manage Movies</h2>
      <button className="add-movie-btn" onClick={() => navigate('/add-movie')}>+ Add New Movie</button>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li className="movie-item" key={movie._id}>
            <span className="movie-title">{movie.title} - {movie.genre}</span>
            <div className="movie-actions">
              <button className="delete-btn" onClick={() => handleDelete(movie._id)}>Delete</button>
              <button className="edit-btn" onClick={() => navigate(`/edit-movie/${movie._id}`)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default ManageMovies;
