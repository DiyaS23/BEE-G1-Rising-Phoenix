import { useState, useEffect } from 'react';
import api from '../api/api';
import './ManageReviews.css';

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await api.get('http://localhost:3002/reviews', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReviews(res.data);
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await api.delete(`http://localhost:3002/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReviews(reviews.filter(review => review.id !== id));
        alert('Review deleted successfully!');
      } catch (err) {
        alert('Failed to delete review.');
      }
    }
  };

  if (role !== 'admin') {
    return <h2 className="no-permission-message">You do not have permission to manage reviews.</h2>;
  }

  return (
    <div className="manage-reviews-container">
      <h2>Manage Reviews</h2>
      <ul className="review-list">
        {reviews.map(review => (
          <li className="review-item" key={review.id}>
            <span className="review-info">
              {review.review} (Rating: {review.rating}/5)
            </span>
            <button className="delete-btn" onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageReviews;
