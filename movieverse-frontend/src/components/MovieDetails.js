import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  // Fetch movie details and reviews
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews`);
        setReviews(res.data.filter(review => review.movieId === Number(id)));
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [id]);

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const newReview = { reviewText, rating, movieId: id };

    try {
      const res = await api.post(`/reviews`, newReview);
      setReviews([...reviews, res.data.review]);
      setReviewText('');
      setRating(1);
      alert('Review added successfully!');
    } catch (err) {
      alert('Failed to add review.');
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.genre} | {movie.releaseYear} | Rating: {movie.rating}</p>
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />

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
