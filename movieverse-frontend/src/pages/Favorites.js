// import { useEffect, useState } from 'react';
// import api from '../api/api';
// // import Navbar from '../components/Navbar';
// import MovieCard from '../components/MovieCard';

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId;
//     api.get(`/favorites/${userId}`)
//       .then(res => setFavorites(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <>
//       <h2>Your Favorites</h2>
//       <div className="movies-grid">
//         {favorites.map(fav => fav.movie && (
//           <MovieCard key={fav.favoriteId} movie={fav.movie} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Favorites;



// import { useEffect, useState } from 'react';
// import api from '../api/api'; // Axios instance
// import MovieCard from '../components/MovieCard'; // MovieCard component to display movies

// function FavoritesPage() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem('userId'); // Get the user ID from localStorage or JWT

//   useEffect(() => {
//     if (!userId) {
//       alert('Please login to view your favorites');
//       return;
//     }

//     // Fetch favorites based on the logged-in user
//     api.get(`/favorites/${userId}`)
//       .then(res => {
//         setFavorites(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching favorites:', err);
//         setLoading(false);
//       });
//   }, [userId]);

//   // Function to handle adding a movie to favorites
//   const handleAddToFavorites = (newMovie) => {
//     setFavorites(prevFavorites => [...prevFavorites, { favoriteId: newMovie.id, movie: newMovie }]);
//   };

//   return (
//     <div>
//       <h1>Your Favorites</h1>
//       {loading ? (
//         <p>Loading favorites...</p>
//       ) : (
//         favorites.length > 0 ? (
//           <div className="movies-grid">
//             {favorites.map(favorite => (
//               <MovieCard key={favorite.favoriteId} movie={favorite.movie} onAddToFavorites={handleAddToFavorites} />
//             ))}
//           </div>
//         ) : (
//           <p>No favorites found.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default FavoritesPage;



// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard'; // MovieCard component to display movies

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token'); // Get token from localStorage
//   const userId = localStorage.getItem('userId'); // Get token from localStorage

//   useEffect(() => {
//     if (!userId || !token) {
//       // If there's no user or token, prompt the user to log in
//       alert('Please login to view your favorites');
//       return;
//     }

//     // Fetch favorites based on the logged-in user
//     api.get(`/favorites/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Send token for authenticated requests
//       }
//     })
//       .then(res => {
//         console.log('Favorites fetched:', res.data);
//         setFavorites(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching favorites:', err);
//         setLoading(false);
//       });
//   }, [userId, token]);

//   return (
//     <div>
//       <h1>Your Favorites</h1>
//       {loading ? (
//         <p>Loading favorites...</p>
//       ) : (
//         favorites.length > 0 ? (
//           <div className="movies-grid">
//             {favorites.map((favorite) => (
//               <MovieCard key={favorite.favoriteId||favorite.id} movie={favorite.movie} />
//             ))}
//           </div>
//         ) : (
//           <p>No favorites found.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Favorites;






// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId || !token) {
//       alert('Please login to view your favorites');
//       return;
//     }

//     api.get(`/favorites/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         setFavorites(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching favorites:', err);
//         setLoading(false);
//       });
//   }, [userId, token]);

//   // ✅ Remove from favorites
//   const handleRemoveFavorite = (favoriteId) => {
//     api.delete(`/favorites/${favoriteId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(() => {
//         setFavorites(favorites.filter(fav => fav.favoriteId !== favoriteId));
//       })
//       .catch(err => {
//         console.error('Error removing favorite:', err);
//       });
//   };

//   return (
//     <div>
//       <h1>Your Favorites</h1>
//       {loading ? (
//         <p>Loading favorites...</p>
//       ) : (
//         favorites.length > 0 ? (
//           <div className="movies-grid">
//             {favorites.map((favorite) => (
//               favorite.movie && (
//                 <div key={favorite._id} className="movie-card">
//                   <MovieCard movie={favorite.movie} />
//                   <button 
//                     className="remove-button"
//                     onClick={() => handleRemoveFavorite(favorite._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               )
//             ))}
//           </div>
//         ) : (
//           <p>No favorites found.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Favorites;








// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId || !token) {
//       alert('Please login to view your favorites');
//       return;
//     }

//     api.get(`/favorites/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         setFavorites(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching favorites:', err);
//         setLoading(false);
//         alert('Failed to load favorites. Please try again later.');
//       });
//   }, [userId, token]);

//   // ✅ Remove from favorites
//   const handleRemoveFavorite = (favoriteId) => {
//     api.delete(`/favorites/${favoriteId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(() => {
//         setFavorites(favorites.filter((fav) => fav._id !== favoriteId));
//       })
//       .catch((err) => {
//         console.error('Error removing favorite:', err);
//         alert('Failed to remove movie from favorites. Please try again later.');
//       });
//   };

//   return (
//     <div>
//       <h1>Your Favorites</h1>
//       {loading ? (
//         <p>Loading favorites...</p>
//       ) : (
//         favorites.length > 0 ? (
//           <div className="movies-grid">
//             {favorites.map((favorite) =>
//               favorite.movie ? (
//                 <div key={favorite._id} className="movie-card">
//                   <MovieCard movie={favorite.movie} />
//                   <button
//                     className="remove-button"
//                     onClick={() => handleRemoveFavorite(favorite._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 <p key={favorite._id}>Movie details not available</p>
//               )
//             )}
//           </div>
//         ) : (
//           <p>No favorites found.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Favorites;



import { useEffect, useState } from 'react';
import api from '../api/api';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Fetch the user's favorite movies
  useEffect(() => {
    if (!userId || !token) {
      alert('Please login to view your favorites');
      return;
    }

    console.log('userId:', userId); // Log the userId
    console.log('token:', token);   // Log the token

    api.get(`/favorites/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log('Favorites Data:', res.data); // Debug log to check the structure of data
        if (res.data && Array.isArray(res.data)) {
          setFavorites(res.data); // Set data only if it's valid
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching favorites:', err);
        setLoading(false);
      });
  }, [userId, token]);

  // Handle removing a favorite item
  const handleRemoveFavorite = (favoriteId) => {
    console.log('Removing favorite with ID:', favoriteId); // Check favoriteId here

    if (!favoriteId) {
      console.error('Invalid favorite ID:', favoriteId); // If ID is invalid, log and return
      return;
    }

    api.delete(`/favorites/${favoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        setFavorites(prev => prev.filter(fav => fav.favoriteId !== favoriteId)); // Remove from UI
      })
      .catch(err => {
        console.error('Error removing from favorites:', err);
      });
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {loading ? (
        <p>Loading favorites...</p>
      ) : (
        favorites.length > 0 ? (
          <div className="movies-grid">
            {favorites.map((favorite) => {
              // Log favorite data to check its structure
              console.log('Favorite:', favorite); 
              if (!favorite.favoriteId || !favorite.movie) {
                console.error('Missing favoriteId or movie in favorite:', favorite);
                return null; // Skip rendering this if any required field is missing
              }

              return (
                <div key={favorite.favoriteId} className="movie-card">
                  <MovieCard movie={favorite.movie} />
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFavorite(favorite.favoriteId)} // Pass favoriteId to delete
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No movies found in your favorites.</p>
        )
      )}
    </div>
  );
}

export default Favorites;
