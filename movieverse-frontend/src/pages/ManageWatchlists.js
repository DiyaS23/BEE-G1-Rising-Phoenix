import { useState, useEffect } from 'react';
import api from '../api/api';
import './ManageWatchlists.css';

function ManageWatchlists() {
  const [watchlists, setWatchlists] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchWatchlists = async () => {
      const res = await api.get('http://localhost:3002/watchlists', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setWatchlists(res.data);
    };
    fetchWatchlists();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this watchlist item?')) {
      try {
        await api.delete(`http://localhost:3002/watchlists/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWatchlists(watchlists.filter(wl => wl.watchlistId !== id));
        alert('Watchlist item removed!');
      } catch (err) {
        alert('Failed to remove watchlist item.');
      }
    }
  };

  if (role !== 'admin') {
    return <h2 className="no-permission-message">You do not have permission to manage watchlists.</h2>;
  }

  return (
    <div className="manage-watchlists-container">
      <h2>Manage Watchlists</h2>
      <ul className="watchlist-list">
        {watchlists.map(wl => (
          <li className="watchlist-item" key={wl.watchlistId}>
            <span className="watchlist-info">{wl.movie?.title}</span>
            <button className="delete-btn" onClick={() => handleDelete(wl.watchlistId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageWatchlists;
