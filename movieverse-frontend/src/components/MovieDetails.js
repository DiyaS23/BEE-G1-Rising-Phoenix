// import React, { useState, useEffect } from 'react';
// import api from '../api/api';
// import { useParams } from 'react-router-dom';
// import './MovieDetails.css';

// function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(1);

//   // Fetch movie details and reviews
//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const res = await api.get(`/movies/${id}`);
//         setMovie(res.data);
//       } catch (err) {
//         console.error('Error fetching movie details:', err);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const res = await api.get(`/reviews`);
//         setReviews(res.data.filter(review => review.movieId === Number(id)));
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//       }
//     };

//     fetchMovieDetails();
//     fetchReviews();
//   }, [id]);

//   // Handle review submission
//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     const newReview = { reviewText, rating, movieId: id };

//     try {
//       const res = await api.post(`/reviews`, newReview);
//       setReviews([...reviews, res.data.review]);
//       setReviewText('');
//       setRating(1);
//       alert('Review added successfully!');
//     } catch (err) {
//       alert('Failed to add review.');
//     }
//   };

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="movie-details">
//       <h2>{movie.title}</h2>
//       <p>{movie.genre} | {movie.releaseYear} | Rating: {movie.rating}</p>
//       <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />

//       <div className="reviews">
//         <h3>Reviews</h3>
//         {reviews.length > 0 ? (
//           <ul>
//             {reviews.map((review, index) => (
//               <li key={index} className="review-item">
//                 <strong>{review.username}</strong> (Rating: {review.rating})
//                 <p>{review.reviewText}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//       </div>

//       <div className="add-review">
//         <h3>Add Review</h3>
//         <form onSubmit={handleSubmitReview}>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Write your review..."
//             required
//           />
//           <input
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             min="1"
//             max="5"
//             required
//           />
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;



// import React, { useState, useEffect } from 'react';
// import api from '../api/api';
// import { useParams } from 'react-router-dom';
// import './MovieDetails.css';

// function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(1);

//   // For demo, detect if user is logged in (replace with your actual auth check)
//   const isLoggedIn = !!localStorage.getItem('token');

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await api.get(`/reviews`);
//         setReviews(res.data.filter(review => review.movieId === Number(id)));
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//       }
//     };

//     fetchReviews();

//     if (isLoggedIn) {
//       // Fetch movie details only for logged-in users
//       const fetchMovieDetails = async () => {
//         try {
//           const res = await api.get(`/movies/${id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//           });
//           setMovie(res.data);
//         } catch (err) {
//           console.error('Error fetching movie details:', err);
//         }
//       };
//       fetchMovieDetails();
//     }
//   }, [id, isLoggedIn]);

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     const newReview = { reviewText, rating, movieId: id };

//     try {
//       const res = await api.post(`/reviews`, newReview, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setReviews([...reviews, res.data.review]);
//       setReviewText('');
//       setRating(1);
//       alert('Review added successfully!');
//     } catch (err) {
//       alert('Failed to add review.');
//     }
//   };

//   if (!isLoggedIn) {
//     // Guest view: show only reviews without movie details or review form
//     return (
//       <div className="movie-details-guest">
//         <h2>Reviews</h2>
//         {reviews.length > 0 ? (
//           <ul>
//             {reviews.map((review, index) => (
//               <li key={index} className="review-item">
//                 <strong>{review.username}</strong> (Rating: {review.rating})
//                 <p>{review.reviewText}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews available.</p>
//         )}
//         <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
//           <p>Login to see movie details and add your own review.</p>
//         </div>
//       </div>
//     );
//   }

//   // Logged-in user view: current full UI
//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="movie-details">
//       <h2>{movie.title}</h2>
//       <p>{movie.genre} | {movie.releaseYear} | Rating: {movie.rating}</p>
//       <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />

//       <div className="reviews">
//         <h3>Reviews</h3>
//         {reviews.length > 0 ? (
//           <ul>
//             {reviews.map((review, index) => (
//               <li key={index} className="review-item">
//                 <strong>{review.username}</strong> (Rating: {review.rating})
//                 <p>{review.reviewText}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//       </div>

//       <div className="add-review">
//         <h3>Add Review</h3>
//         <form onSubmit={handleSubmitReview}>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Write your review..."
//             required
//           />
//           <input
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             min="1"
//             max="5"
//             required
//           />
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;


// import React, { useState, useEffect } from 'react';
// import api from '../api/api';
// import { useParams } from 'react-router-dom';
// import './MovieDetails.css';

// function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(1);

//   // For demo, detect if user is logged in (replace with your actual auth check)
//   const isLoggedIn = !!localStorage.getItem('token');

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await api.get(`/reviews-all`);  // updated endpoint
//         // Filter reviews for this movie by matching movieId as string
//         setReviews(res.data.filter(review => review.movieId === id));
//       } catch (err) {
//         console.error('Error fetching reviews:', err);
//       }
//     };

//     fetchReviews();

//     if (isLoggedIn) {
//       // Fetch movie details only for logged-in users
//       const fetchMovieDetails = async () => {
//         try {
//           const res = await api.get(`/movies/${id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//           });
//           setMovie(res.data);
//         } catch (err) {
//           console.error('Error fetching movie details:', err);
//         }
//       };
//       fetchMovieDetails();
//     }
//   }, [id, isLoggedIn]);

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     const newReview = { reviewText, rating, movieId: id };

//     try {
//       const res = await api.post(`/reviews`, newReview, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       // Add the new review to the list (assuming res.data.review has the new review)
//       setReviews([...reviews, res.data.review]);
//       setReviewText('');
//       setRating(1);
//       alert('Review added successfully!');
//     } catch (err) {
//       alert('Failed to add review.');
//     }
//   };

//   if (!isLoggedIn) {
//     // Guest view: show only reviews without movie details or review form
//     return (
//       <div className="movie-details-guest">
//         <h2>Reviews</h2>
//         {reviews.length > 0 ? (
//           <ul>
//             {reviews.map((review, index) => (
//               <li key={index} className="review-item">
//                 <strong>{review.username}</strong> (Rating: {review.rating})
//                 <p>{review.reviewText}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews available.</p>
//         )}
//         <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
//           <p>Login to see movie details and add your own review.</p>
//         </div>
//       </div>
//     );
//   }

//   // Logged-in user view: current full UI
//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="movie-details">
//       <h2>{movie.title}</h2>
//       <p>{movie.genre} | {movie.releaseYear} | Rating: {movie.rating}</p>
//       <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />

//       <div className="reviews">
//         <h3>Reviews</h3>
//         {reviews.length > 0 ? (
//           <ul>
//             {reviews.map((review, index) => (
//               <li key={index} className="review-item">
//                 <strong>{review.username}</strong> (Rating: {review.rating})
//                 <p>{review.reviewText}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//       </div>

//       <div className="add-review">
//         <h3>Add Review</h3>
//         <form onSubmit={handleSubmitReview}>
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Write your review..."
//             required
//           />
//           <input
//             type="number"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//             min="1"
//             max="5"
//             required
//           />
//           <button type="submit">Submit Review</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;





import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './MovieDetails.css';
function convertYouTubeUrl(url) {
  try {
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return url;
  } catch (err) {
    console.error('Invalid YouTube URL:', url);
    return url;
  }
}

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [showTrailer, setShowTrailer] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews-all');
        setReviews(res.data.filter(review => review.movieId === id));
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();

    if (isLoggedIn) {
      const fetchMovieDetails = async () => {
        try {
          const res = await api.get(`/movies/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setMovie(res.data);
        } catch (err) {
          console.error('Error fetching movie details:', err);
        }
      };
      fetchMovieDetails();
    }
  }, [id, isLoggedIn]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const newReview = { reviewText, rating, movieId: id };

    try {
      const res = await api.post('/reviews', newReview, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setReviews([...reviews, res.data.review]);
      setReviewText('');
      setRating(1);
      alert('Review added successfully!');
    } catch (err) {
      alert('Failed to add review.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="movie-details-guest">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="review-item">
                <strong>{review.username}</strong> (Rating: {review.rating})
                <p>{review.reviewText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
        <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
          <p>Login to see movie details and add your own review.</p>
        </div>
      </div>
    );
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.genre} | {movie.releaseYear} | Rating: {movie.rating}</p>

      {showTrailer && movie.trailerUrl ? (
        <div className="trailer-container">
          <ReactPlayer
           url={convertYouTubeUrl(movie.trailerUrl)}
            playing
            controls
            width="100%"
            height="400px"
          />
        </div>
      ) : (
        <div className="poster-container">
          <img
            src={movie.posterUrl || 'https://via.placeholder.com/200x300?text=No+Poster'}
            alt={movie.title}
            className="movie-poster"
          />
          {movie.trailerUrl && (
            <button onClick={() => setShowTrailer(true)} className="trailer-button">
              ▶ Watch Trailer
            </button>
          )}
        </div>
      )}

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="review-item">
                <strong>{review.username}</strong> (Rating: {review.rating})
                <p>{review.reviewText}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="add-review">
        <h3>Add Review</h3>
        <form onSubmit={handleSubmitReview}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            required
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default MovieDetails;
