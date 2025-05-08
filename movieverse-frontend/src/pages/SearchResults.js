import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';
// import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

function SearchResults() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    api.get(`/search?title=${query}`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <>
      <h2>Search Results for "{query}"</h2>
      <div className="movies-grid">
        {results.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default SearchResults;
