// import { useEffect, useState } from 'react';
// import api from '../api/api';
// import Hero from '../components/Hero';
// import MovieCard from '../components/MovieCard';

// function Home() {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     api.get('/movies')
//       .then(res => setMovies(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <>
//       <Hero />
//       <div className="movies-grid">
//         {movies.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home;


// import { useEffect, useState } from 'react';
// import api from '../api/api'; // Assuming api.js contains the Axios instance
// import Hero from '../components/Hero';
// import MovieCard from '../components/MovieCard'; // Assuming MovieCard displays individual movie details

// function Home() {
//   const [movies, setMovies] = useState([]);

//   // Fetch movies from the backend
//   useEffect(() => {
//     api.get('/movies')
//       .then(res => setMovies(res.data))  // Assuming backend returns an array of movies
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <>
//       <Hero /> {/* The Hero section */}
//       <div className="movies-grid"> {/* Container for movies */}
//         {movies.length > 0 ? (
//           movies.map(movie => (
//             <MovieCard key={movie.id} movie={movie} /> // Display each movie in a MovieCard component
//           ))
//         ) : (
//           <p>Loading movies...</p> // Show loading message while data is being fetched
//         )}
//       </div>
//     </>
//   );
// }

// export default Home;




// import { useEffect, useState } from 'react';
// import api from '../api/api'; // Assuming api.js contains the Axios instance
// import Hero from '../components/Hero';
// import MovieCard from '../components/MovieCard'; // Assuming MovieCard displays individual movie details
// import TopRatedMovies from '../components/TopRatedMovies';

// function Home() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state to show the loading message

//   // Fetch movies from the backend
//   useEffect(() => {
//     api.get('/movies')
//       .then(res => {
//         setMovies(res.data);  // Set movies data after fetching
//         setLoading(false);     // Set loading to false after data is fetched
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);     // Set loading to false if there's an error fetching data
//       });
//   }, []);

//   return (
//     <>
//       <Hero /> {/* The Hero section */}
//       <h2 style={{ textAlign: 'center', marginTop: '30px' }}>All Movies</h2>
//       <div className="movies-grid"> {/* Container for movies */}
//         {loading ? (  // Show loading message while data is being fetched
//           <p>Loading movies...</p>
//         ) : (  // Once loading is false, display movies
//           movies.length > 0 ? (
//             movies.map(movie => (
//               <MovieCard key={movie.id} movie={movie} />  // Display each movie in a MovieCard component
//             ))
//           ) : (
//             <p>No movies available.</p>  // Show a message if there are no movies
//           )
//         )}
//       </div>
//       <TopRatedMovies />
//     </>
//   );
// }

// export default Home;


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import api from '../api/api'; // Assuming api.js contains the Axios instance
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard'; // Assuming MovieCard displays individual movie details
import TopRatedMovies from '../components/TopRatedMovies';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show the loading message

  // Fetch movies from the backend
  useEffect(() => {
    api.get('/movies')
      .then(res => {
        setMovies(res.data);  // Set movies data after fetching
        setLoading(false);     // Set loading to false after data is fetched
      })
      .catch(err => {
        console.error(err);
        setLoading(false);     // Set loading to false if there's an error fetching data
      });
  }, []);

  return (
    <>
      <Hero /> {/* The Hero section */}
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>All Movies</h2>
      <div className="movies-grid" id='all-movies'>  {/* Container for movies */}
        {loading ? (  // Show loading message while data is being fetched
          <p>Loading movies...</p>
        ) : (  // Once loading is false, display movies
          movies.length > 0 ? (
            movies.map(movie => (
              <Link key={movie._id} to={`/movie/${movie._id}`} className="movie-link">
                <MovieCard movie={movie} />  {/* Display each movie in a MovieCard component */}
              </Link>
            ))
          ) : (
            <p>No movies available.</p>  // Show a message if there are no movies
          )
        )}
      </div>
      <TopRatedMovies />
    </>
  );
}

export default Home;
