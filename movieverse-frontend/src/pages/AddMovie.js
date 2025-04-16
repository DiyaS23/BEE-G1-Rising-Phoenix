import { useState } from 'react';
import api from '../api/api';
import './MovieForm.css';


function AddMovie() {
  // ✅ Always call hooks at the very top
  const [movie, setMovie] = useState({ title: '', genre: '', releaseYear: '', rating: '', posterUrl: '' });
  const role = localStorage.getItem('role');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:3002/movies', movie, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Movie added successfully!');
      setMovie({ title: '', genre: '', releaseYear: '', rating: '', posterUrl: '' });
    } catch (err) {
      alert('Failed to add movie.');
    }
  };

  // ✅ Do conditional rendering inside the return
  if (role !== 'admin') {
    return <div className="movie-form-container"><h2 className="no-permission">You do not have permission to add movies.</h2></div>;
  }
  
  return (
    <div className="movie-form-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} required />
        <input type="text" placeholder="Genre" value={movie.genre} onChange={(e) => setMovie({ ...movie, genre: e.target.value })} required />
        <input type="number" placeholder="Release Year" value={movie.releaseYear} onChange={(e) => setMovie({ ...movie, releaseYear: e.target.value })} required />
        <input type="number" placeholder="Rating" value={movie.rating} onChange={(e) => setMovie({ ...movie, rating: e.target.value })} required />
        <input type="text" placeholder="Poster URL" value={movie.posterUrl} onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })} required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
