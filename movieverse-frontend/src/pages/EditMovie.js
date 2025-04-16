import { useState, useEffect } from 'react';
import api from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieForm.css';


function EditMovie() {
  // ✅ Always call hooks first
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await api.get(`http://localhost:3002/movies/${id}`);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`http://localhost:3002/movies/${id}`, movie, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Movie updated!');
      navigate('/manage-movies');
    } catch (err) {
      alert('Failed to update movie.');
    }
  };

  // ✅ Conditional rendering happens here, not before hooks
  if (role !== 'admin') {
    return <div className="movie-form-container"><h2 className="no-permission">You do not have permission to edit movies.</h2></div>;
  }
  
  if (!movie) return <div className="movie-form-container"><h2>Loading...</h2></div>;

  return (
    <div className="movie-form-container">
      <h2>Update Movie</h2>
    <form onSubmit={handleUpdate}>
      <input type="text" value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} required />
      <input type="text" value={movie.genre} onChange={(e) => setMovie({ ...movie, genre: e.target.value })} required />
      <input type="number" value={movie.releaseYear} onChange={(e) => setMovie({ ...movie, releaseYear: e.target.value })} required />
      <input type="number" value={movie.rating} onChange={(e) => setMovie({ ...movie, rating: e.target.value })} required />
      <input type="text" value={movie.posterUrl} onChange={(e) => setMovie({ ...movie, posterUrl: e.target.value })} required />
      <button type="submit">Update Movie</button>
    </form>
    </div>
  );
}

export default EditMovie;
