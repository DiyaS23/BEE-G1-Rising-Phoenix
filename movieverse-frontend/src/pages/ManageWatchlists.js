// import { useState, useEffect } from 'react';
// import api from '../api/api';
// import './ManageWatchlists.css';

// function ManageWatchlists() {
//   const [watchlists, setWatchlists] = useState([]);
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchWatchlists = async () => {
//       const res = await api.get('http://localhost:3002/watchlists/admin-all', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setWatchlists(res.data);
//     };
//     fetchWatchlists();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to remove this watchlist item?')) {
//       try {
//         await api.delete(`http://localhost:3002/watchlists/admin/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setWatchlists(watchlists.filter(wl => wl.watchlistId !== id));
//         alert('Watchlist item removed!');
//       } catch (err) {
//         alert('Failed to remove watchlist item.');
//       }
//     }
//   };

//   if (role !== 'admin') {
//     return <h2 className="no-permission-message">You do not have permission to manage watchlists.</h2>;
//   }

//   return (
//     <div className="manage-watchlists-container">
//       <h2>Manage Watchlists</h2>
//       <ul className="watchlist-list">
//         {watchlists.map(wl => (
//           <li className="watchlist-item" key={wl.watchlistId}>
//             <span className="watchlist-info"><strong>User:</strong> {wl.userName || 'Unknown User'}<br />
//             <strong>Movie:</strong> {wl.movie?.title || 'Movie not found'}
//             </span>
//             <button className="delete-btn" onClick={() => handleDelete(wl.watchlistId)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ManageWatchlists;


import { useState, useEffect } from 'react';
import api from '../api/api';
import './ManageWatchlists.css';

function ManageWatchlists() {
  const [groupedWatchlists, setGroupedWatchlists] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchWatchlists = async () => {
      const res = await api.get('http://localhost:3002/watchlists/admin-all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGroupedWatchlists(res.data);
    };
    fetchWatchlists();
  }, []);

  const handleDelete = async (userId, watchlistId) => {
    if (window.confirm('Are you sure you want to remove this watchlist item?')) {
      try {
        await api.delete(`http://localhost:3002/watchlists/admin/${watchlistId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setGroupedWatchlists(prev =>
          prev.map(group =>
            group.userId === userId
              ? {
                  ...group,
                  watchlists: group.watchlists.filter(wl => wl.watchlistId !== watchlistId),
                }
              : group
          ).filter(group => group.watchlists.length > 0) // remove group if no watchlists left
        );

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
      {groupedWatchlists.map(group => (
        <div key={group.userId} className="user-watchlist-group">
          <h3>{group.username} (User ID: {group.userId})</h3>
          <ul className="watchlist-list">
            {group.watchlists.map(wl => (
              <li className="watchlist-item" key={wl.watchlistId}>
                <span className="watchlist-info">{wl.movie?.title || 'Movie not found'}</span>
                <button className="delete-btn" onClick={() => handleDelete(group.userId, wl.watchlistId)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ManageWatchlists;
