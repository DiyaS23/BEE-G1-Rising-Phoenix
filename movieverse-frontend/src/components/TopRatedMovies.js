import { useEffect, useState } from 'react';
import api from '../api/api';
import MovieCard from './MovieCard';

function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/movies-top-rated', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setTopRatedMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch top-rated movies", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Top Rated Movies</h2>
      <div className="movies-grid">
        {loading ? (
          <p>Loading top rated movies...</p>
        ) : (
          topRatedMovies.length > 0 ? (
            topRatedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No top-rated movies available.</p>
          )
        )}
      </div>
    </div>
  );
}

export default TopRatedMovies;
