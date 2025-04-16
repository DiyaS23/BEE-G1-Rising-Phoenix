// import './MovieCard.css'; // For styling
// // import { useNavigate } from 'react-router-dom';
// import api from '../api/api';

// function MovieCard({ movie }) {
// //   const navigate = useNavigate();

//   const handleAddToFavorites = () => {
//     api.post('/favorites', { movieId: movie.id })
//       .then(response => {
//         alert(response.data.message);
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





import './MovieCard.css'; // For styling
import api from '../api/api';

function MovieCard({ movie, onAddToFavorites }) {

  const handleAddToFavorites = () => {
    api.post('/favorites', { movieId: movie.id })
      .then(response => {
        alert(response.data.message);
        if (onAddToFavorites) {
          onAddToFavorites(movie); // Notify parent component (FavoritesPage)
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  const handleAddToWatchlist = () => {
    api.post('/watchlists', { movieId: movie.id })
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <h3 className="movie-title">{movie.title}</h3>
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
