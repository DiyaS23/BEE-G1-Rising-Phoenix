import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
//   const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    api.put(`/users/${userId}/password`, { oldPassword, newPassword })
      .then((res) => {
        setMessage(res.data.message);
        // Optionally redirect
        // navigate('/');
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || 'Failed to update password');
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔐 Change Password</h2>
      <form onSubmit={handleChangePassword} className="login-form">
        <input
          type="password"
          placeholder="🔑 Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="🆕 New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Update Password</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default ChangePassword;
