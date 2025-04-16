// import { useEffect, useState } from 'react';
// import api from '../api/api';
// // import Navbar from '../components/Navbar';
// import MovieCard from '../components/MovieCard';

// function Watchlist() {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     api.get('/watchlists')
//       .then(res => {
//         const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId;
//         const userWatchlist = res.data.filter(item => item.userId === userId);
//         setWatchlist(userWatchlist);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <>
      
//       <h2>Your Watchlist</h2>
//       <div className="movies-grid">
//         {watchlist.map(item => item.movie && (
//           <MovieCard key={item.movie.id} movie={item.movie} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Watchlist;

// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Watchlist() {
//   const [watchlists, setWatchlists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       alert('Please login to view your watchlists');
//       return;
//     }

//     api.get('/watchlists', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         console.log('Watchlists fetched:', res.data);
//         setWatchlists(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching watchlists:', err);
//         setLoading(false);
//       });
//   }, [token]);

//   return (
//     <div>
//       <h1>Your Watchlist</h1>
//       {loading ? (
//         <p>Loading watchlists...</p>
//       ) : (
//         watchlists.length > 0 ? (
//           <div className="movies-grid">
//             {watchlists.map((watchlist, index) => (
//               watchlist.movie ? (
//                 <MovieCard key={index} movie={watchlist.movie} />
//               ) : null
//             ))}
//           </div>
//         ) : (
//           <p>No movies found in your watchlist.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Watchlist;


// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Watchlist() {
//   const [watchlists, setWatchlists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       alert('Please login to view your watchlists');
//       return;
//     }

//     api.get('/watchlists', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         setWatchlists(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching watchlists:', err);
//         setLoading(false);
//       });
//   }, [token]);

//   // ✅ Remove from watchlist
//   const handleRemoveWatchlist = (watchlistId) => {
//     api.delete(`/watchlists/${watchlistId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(() => {
//       setWatchlists(watchlists.filter(watch => watch.id !== watchlistId));  // ← change this!
//     })
//     .catch(err => {
//       console.error('Error removing from watchlist:', err);
//     });
//   };
  

//   return (
//     <div>
//       <h1>Your Watchlist</h1>
//       {loading ? (
//         <p>Loading watchlists...</p>
//       ) : (
//         watchlists.length > 0 ? (
//           <div className="movies-grid">
//             {watchlists.map((watchlist) => (
//               watchlist.movie && (
//                 <div key={watchlist.id} className="movie-card">
//                   <MovieCard movie={watchlist.movie} />
//                   <button 
//                     className="remove-button"
//                     onClick={() => handleRemoveWatchlist(watchlist.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               )
//             ))}
//           </div>
//         ) : (
//           <p>No movies found in your watchlist.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Watchlist;


// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Watchlist() {
//   const [watchlists, setWatchlists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       alert('Please login to view your watchlists');
//       return;
//     }

//     api.get('/watchlists', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         setWatchlists(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching watchlists:', err);
//         setLoading(false);
//       });
//   }, [token]);

//   // ✅ Remove from watchlist
//   const handleRemoveWatchlist = (watchlistId) => {
//     api.delete(`/watchlists/${watchlistId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(() => {
//       // Remove it from local state after successful delete
//       setWatchlists(prevWatchlists => prevWatchlists.filter(watch => watch.id !== watchlistId));
//     })
//     .catch(err => {
//       console.error('Error removing from watchlist:', err);
//     });
//   };
//   console.log("Watchlist IDs:", watchlists.map(w => w.id));


//   return (
//     <div>
//       <h1>Your Watchlist</h1>
//       {loading ? (
//         <p>Loading watchlists...</p>
//       ) : (
//         watchlists.length > 0 ? (
//           <div className="movies-grid">
//             {watchlists.map((watchlist) => (
//   <div key={watchlist.id} className="movie-card">
//     <MovieCard movieId={watchlist.movieId} />  {/* or fetch movie data by ID */}
//     <button 
//       className="remove-button"
//       onClick={() => handleRemoveWatchlist(watchlist.id)}
//     >
//       Remove
//     </button>
//   </div>
// ))}

//           </div>
//         ) : (
//           <p>No movies found in your watchlist.</p>
//         )
//       )}
//     </div>
//   );
// }

// export default Watchlist;

import { useEffect, useState } from 'react';
import api from '../api/api';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId || !token) {
      alert('Please login to view your watchlists');
      return;
    }

    api.get(`/watchlists/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        setWatchlists(res.data);  // movie object is included now
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching watchlists:', err);
        setLoading(false);
      });
  }, [userId, token]);

  // ✅ Remove from watchlist
  const handleRemoveWatchlist = (watchlistId) => {
    api.delete(`/watchlists/${watchlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(() => {
      // Remove it from local state after successful delete
      setWatchlists(prevWatchlists => prevWatchlists.filter(watch => watch.watchlistId !== watchlistId));
    })
    .catch(err => {
      console.error('Error removing from watchlist:', err);
    });
  };

  return (
    <div>
      <h1>Your Watchlist</h1>
      {loading ? (
        <p>Loading watchlists...</p>
      ) : (
        watchlists.length > 0 ? (
          <div className="movies-grid">
            {watchlists.map((watchlist) => (
              watchlist.movie && (
                <div key={watchlist.watchlistId} className="movie-card">
                  <MovieCard movie={watchlist.movie} />
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveWatchlist(watchlist.watchlistId)}
                  >
                    Remove
                  </button>
                </div>
              )
            ))}
          </div>
        ) : (
          <p>No movies found in your watchlist.</p>
        )
      )}
    </div>
  );
}

export default Watchlist;
