import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    api.post('/users', { username, password })
      .then((response) => {
        navigate('/login'); // Redirect to login page after successful signup
      })
      .catch((error) => {
        setErrorMessage('Signup failed. Please try again.');
      });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">🎬 MovieVerse Signup</h1>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Signup;
