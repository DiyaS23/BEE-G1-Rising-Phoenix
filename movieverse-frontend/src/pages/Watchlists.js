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

// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import MovieCard from '../components/MovieCard';

// function Watchlist() {
//   const [watchlists, setWatchlists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId || !token) {
//       alert('Please login to view your watchlists');
//       return;
//     }

//     api.get(`/watchlists/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         console.log(res.data); // Log the response to see the structure
//         setWatchlists(res.data);  // movie object is included now
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching watchlists:', err);
//         setLoading(false);
//       });
//   }, [userId, token]);

//   // ✅ Remove from watchlist
//   const handleRemoveWatchlist = (watchlistId) => {
//     api.delete(`/watchlists/${watchlistId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(() => {
//       // Remove it from local state after successful delete
//       setWatchlists(prevWatchlists => prevWatchlists.filter(watch => watch._id !== watchlistId));
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
//                 <div key={watchlist._id} className="movie-card">
//                   <MovieCard movie={watchlist.movie} />
//                   <button 
//                     className="remove-button"
//                     onClick={() => handleRemoveWatchlist(watchlist._id)}
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
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId || !token) {
//       alert('Please login to view your watchlists');
//       return;
//     }
//     console.log('userId:', userId); // Log the userId
//     console.log('token:', token);   // Log the token
//     api.get(`/watchlists/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(res => {
//         console.log('Watchlist Data:', res.data); // debug log
//         setWatchlists(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching watchlists:', err);
//         setLoading(false);
//       });
//   }, [userId, token]);

//   // const handleRemoveWatchlist = (watchlistId) => {
//   //   console.log('Removing watchlist with ID:', watchlistId); // Log watchlistId
//   //   api.delete(`/watchlists/${watchlistId}`, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     }
//   //   })
//   //   .then(() => {
//   //     setWatchlists(prev => prev.filter(watch => watch._id !== watchlistId));
//   //   })
//   //   .catch(err => {
//   //     console.error('Error removing from watchlist:', err);
//   //   });
//   // };
//   const handleRemoveWatchlist = (watchlistId) => {
//     console.log('Removing watchlist with ID:', watchlistId); // Check if the ID is correct
//     if (!watchlistId) {
//       console.error('Invalid watchlist ID:', watchlistId); // Log the invalid ID
//       return;
//     }
//     api.delete(`/watchlists/${watchlistId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(() => {
//       setWatchlists(prev => prev.filter(watch => watch._id !== watchlistId));
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
//             {watchlists.map((watchlist) =>
//               watchlist.movie ? (
//                 <div key={watchlist._id} className="movie-card">
//                   <MovieCard movie={watchlist.movie} />
//                   <button
//                     className="remove-button"
//                     onClick={() => {
//                       console.log('Removing watchlist with ID:', watchlist._id); // Debug the ID
//                       handleRemoveWatchlist(watchlist._id);
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : null
//             )}
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

  // Fetch the user's watchlists
  useEffect(() => {
    if (!userId || !token) {
      alert('Please login to view your watchlists');
      return;
    }

    console.log('userId:', userId); // Log the userId
    console.log('token:', token);   // Log the token

    api.get(`/watchlists/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log('Watchlist Data:', res.data); // Debug log to check the structure of data
        if (res.data && Array.isArray(res.data)) {
          setWatchlists(res.data); // Set data only if it's valid
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching watchlists:', err);
        setLoading(false);
      });
  }, [userId, token]);

  // Handle removing a watchlist item
  const handleRemoveWatchlist = (watchlistId) => {
    console.log('Removing watchlist with ID:', watchlistId); // Check watchlistId here

    if (!watchlistId) {
      console.error('Invalid watchlist ID:', watchlistId); // If ID is invalid, log and return
      return;
    }

    api.delete(`/watchlists/${watchlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        setWatchlists(prev => prev.filter(watch => watch.watchlistId !== watchlistId)); // Remove from UI
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
            {watchlists.map((watchlist) => {
              // Log watchlist data to check its structure
              console.log('Watchlist:', watchlist); 
              if (!watchlist.watchlistId || !watchlist.movie) {
                console.error('Missing watchlistId or movie in watchlist:', watchlist);
                return null; // Skip rendering this if any required field is missing
              }

              return (
                <div key={watchlist.watchlistId} className="movie-card">
                  <MovieCard movie={watchlist.movie} />
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveWatchlist(watchlist.watchlistId)} // Pass watchlistId to delete
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No movies found in your watchlist.</p>
        )
      )}
    </div>
  );
}

export default Watchlist;
