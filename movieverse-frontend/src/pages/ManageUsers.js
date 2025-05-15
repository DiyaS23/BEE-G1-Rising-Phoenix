// import { useState, useEffect } from 'react';
// import api from '../api/api';
// // import { useNavigate } from 'react-router-dom';
// import './ManageUsers.css';

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
// //   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await api.get('http://localhost:3002/users', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`http://localhost:3002/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setUsers(users.filter(user => user.id !== id));
//         alert('User deleted successfully!');
//       } catch (err) {
//         alert('Failed to delete user.');
//       }
//     }
//   };

//   if (role !== 'admin') {
//     return <h2 className="no-permission-message">You do not have permission to manage users.</h2>;
//   }

//   return (
//     <div className="manage-users-container">
//       <h2>Manage Users</h2>
//       <ul className="user-list">
//         {users.map(user => (
//           <li className="user-item" key={user.id}>
//             <span className="user-info">{user.username} - {user.role}</span>
//             <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ManageUsers;


// import { useState, useEffect } from 'react';
// import api from '../api/api';
// // import { useNavigate } from 'react-router-dom';
// import './ManageUsers.css';

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [newPassword, setNewPassword] = useState('');
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await api.get('http://localhost:3002/users', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`http://localhost:3002/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setUsers(users.filter(user => user._id !== id));
//         alert('User deleted successfully!');
//       } catch (err) {
//         alert('Failed to delete user.');
//       }
//     }
//   };

//   const handlePasswordUpdate = async (id) => {
//     try {
//       await api.put(`http://localhost:3002/users/${id}/password`, {
//         newPassword,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       alert('Password updated successfully!');
//       setNewPassword('');
//       setEditingUserId(null);
//     } catch (err) {
//       alert('Failed to update password.');
//     }
//   };

//   if (role !== 'admin') {
//     return <h2 className="no-permission-message">You do not have permission to manage users.</h2>;
//   }

//   return (
//     <div className="manage-users-container">
//       <h2>Manage Users</h2>
//       <ul className="user-list">
//         {users.map(user => (
//           <li className="user-item" key={user._id}>
//             <span className="user-info">{user.username} - {user.role}</span>
//             <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
//             <button className="change-btn" onClick={() => setEditingUserId(user._id)}>Change Password</button>

//             {editingUserId === user._id && (
//               <div className="password-edit-form">
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <button onClick={() => handlePasswordUpdate(user._id)}>Update</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ManageUsers;




// import { useState, useEffect } from 'react';
// import api from '../api/api';
// import './ManageUsers.css';

// function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [newPassword, setNewPassword] = useState('');
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await api.get('http://localhost:3002/users', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setUsers(res.data);
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await api.delete(`http://localhost:3002/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setUsers(users.filter(user => user._id !== id));
//         alert('User deleted successfully!');
//       } catch (err) {
//         alert('Failed to delete user.');
//       }
//     }
//   };

//   const handlePasswordUpdate = async (id) => {
//     try {
//       await api.put(`http://localhost:3002/users/${id}/password`, {
//         newPassword,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       alert('Password updated successfully!');
//       setNewPassword('');
//       setEditingUserId(null);
//     } catch (err) {
//       alert('Failed to update password.');
//     }
//   };

//   const handleRoleChange = async (id, newRole) => {
//     try {
//       await api.put(`http://localhost:3002/users/${id}/role`, {
//         role: newRole,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       alert('Role updated successfully!');
//       setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
//     } catch (err) {
//       alert('Failed to update role.');
//     }
//   };
// if (user._id === localStorage.getItem("userId") && newRole !== role) {
//   alert("Your role has changed. You'll be logged out.");
//   localStorage.clear();
//   window.location.href = '/login';
// }

//   if (role !== 'admin') {
//     return <h2 className="no-permission-message">You do not have permission to manage users.</h2>;
//   }

//   return (
//     <div className="manage-users-container">
//       <h2>Manage Users</h2>
//       <ul className="user-list">
//         {users.map(user => (
//           <li className="user-item" key={user._id}>
//             <span className="user-info">{user.username}</span>
//             <span className="user-role"> - {user.role}</span>

//             <select
//               value={user.role}
//               onChange={(e) => handleRoleChange(user._id, e.target.value)}
//               className="role-select"
//             >
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>

//             <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
//             <button className="change-btn" onClick={() => setEditingUserId(user._id)}>Change Password</button>

//             {editingUserId === user._id && (
//               <div className="password-edit-form">
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <button onClick={() => handlePasswordUpdate(user._id)}>Update</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ManageUsers;




import { useState, useEffect } from 'react';
import api from '../api/api';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const role = localStorage.getItem('role');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('http://localhost:3002/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        alert('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`http://localhost:3002/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(users.filter(user => user._id !== id));
        alert('User deleted successfully!');
      } catch (err) {
        alert('Failed to delete user.');
      }
    }
  };

  const handlePasswordUpdate = async (id) => {
    try {
      await api.put(`http://localhost:3002/users/${id}/password`, {
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Password updated successfully!');
      setNewPassword('');
      setEditingUserId(null);
    } catch (err) {
      alert('Failed to update password.');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`http://localhost:3002/users/${id}/role`, {
        role: newRole,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUsers(users.map(user =>
        user._id === id ? { ...user, role: newRole } : user
      ));

      alert('Role updated successfully!');

      // If the logged-in user changed their own role
      if (id === currentUserId && newRole !== role) {
        alert("Your role has changed. You'll be logged out.");
        localStorage.clear();
        window.location.href = '/login';
      }
    } catch (err) {
      alert('Failed to update role.');
    }
  };

  if (role !== 'admin') {
    return <h2 className="no-permission-message">You do not have permission to manage users.</h2>;
  }

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <ul className="user-list">
        {users.map(user => (
          <li className="user-item" key={user._id}>
            <span className="user-info">{user.username}</span>
            <span className="user-role"> - {user.role}</span>

            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
              className="role-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
            <button className="change-btn" onClick={() => setEditingUserId(user._id)}>Change Password</button>

            {editingUserId === user._id && (
              <div className="password-edit-form">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={() => handlePasswordUpdate(user._id)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
