// import './MovieCard.css'; // For styling
// import api from '../api/api';

// function MovieCard({ movie, onAddToFavorites }) {

//   const handleAddToFavorites = () => {
//     api.post('/favorites', { movieId: movie.id })
//       .then(response => {
//         alert(response.data.message);
//         if (onAddToFavorites) {
//           onAddToFavorites(movie); // Notify parent component (FavoritesPage)
//         }
//       })
//       .catch(error => {
//         alert(error.response.data.message);
//       });
//   };

//   const handleAddToWatchlist = () => {
//     api.post('/watchlists', { movieId: movie.id })
//       .then(response => {
//         alert(response.data.message);
//       })
//       .catch(error => {
//         alert(error.response.data.message);
//       });
//   };

//   return (
//     <div className="movie-card">
//       <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
//       <h3 className="movie-title">{movie.title}</h3>
//       <div className="movie-actions">
//         <button onClick={handleAddToFavorites} className="icon-button">
//           <i className="fas fa-heart"></i>
//         </button>
//         <button onClick={handleAddToWatchlist} className="icon-button">
//           <i className="fas fa-bookmark"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MovieCard;






// import './MovieCard.css'; // For styling
// import api from '../api/api';

// function MovieCard({ movie, onAddToFavorites }) {

//   const handleAddToFavorites = () => {
//     if (!movie._id) {
//       alert('Invalid movie ID');
//       return;
//     }
//     // Use movie._id instead of movie.id
//     api.post('/favorites', { movieId: movie._id })
//       .then(response => {
//         alert(response.data.message);
//         if (onAddToFavorites) {
//           onAddToFavorites(movie); // Notify parent component (FavoritesPage)
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         alert(error.response.data.message);
//       });
//   };

//   const handleAddToWatchlist = () => {
//     // Use movie._id instead of movie.id
//     api.post('/watchlists', { movieId: movie._id })
//       .then(response => {
//         alert(response.data.message);
//       })
//       .catch(error => {
//         alert(error.response.data.message);
//       });
//   };

//   return (
//     <div className="movie-card">
//       <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
//       <h3 className="movie-title">{movie.title}</h3>
//       <div className="movie-actions">
//         <button onClick={handleAddToFavorites} className="icon-button">
//           <i className="fas fa-heart"></i>
//         </button>
//         <button onClick={handleAddToWatchlist} className="icon-button">
//           <i className="fas fa-bookmark"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MovieCard;





import './MovieCard.css';
import api from '../api/api';

function MovieCard({ movie, onAddToFavorites }) {
  const handleAddToFavorites = () => {
    if (!movie._id) {
      alert('Invalid movie ID');
      return;
    }
    api.post('/favorites', { movieId: movie._id })
      .then(response => {
        alert(response.data.message);
        if (onAddToFavorites) {
          onAddToFavorites(movie);
        }
      })
      .catch(error => {
        console.error(error);
        alert(error.response?.data?.message || 'Error adding to favorites');
      });
  };

  const handleAddToWatchlist = () => {
    api.post('/watchlists', { movieId: movie._id })
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.response?.data?.message || 'Error adding to watchlist');
      });
  };

  return (
    <div className="movie-card">
      <img
        src={movie.posterUrl || 'https://via.placeholder.com/200x300?text=No+Poster'}
        alt={movie.title || 'No Title'}
        className="movie-poster"
      />
      <h3 className="movie-title">{movie.title || 'Untitled Movie'}</h3>
      <div className="movie-actions">
        <button onClick={handleAddToFavorites} className="icon-button">
          <i className="fas fa-heart"></i>
        </button>
        <button onClick={handleAddToWatchlist} className="icon-button">
          <i className="fas fa-bookmark"></i>
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
