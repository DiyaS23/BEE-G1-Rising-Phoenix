// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/api';
// import './Login.css'; // Assuming you'll save the CSS separately

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     api.post('/login', { username, password })
//       .then((response) => {
//         console.log(response.data);
//         const { token, userId, role } = response.data;
//         localStorage.setItem('token', token);
//         localStorage.setItem('userId', userId);
//         localStorage.setItem('role', role);
//         navigate('/');
//       })
//       .catch((error) => {
//         setErrorMessage('Login failed. Please try again.');
//       });
//   };

//   return (
//     <div className="login-container">
//       <h1 className="login-title">🎬 MovieVerse Login</h1>
//       <form onSubmit={handleLogin} className="login-form">
//         <input
//           type="text"
//           placeholder="👤 Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="login-input"
//         />
//         <input
//           type="password"
//           placeholder="🔒 Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="login-input"
//         />
//         <button type="submit" className="login-button">Login</button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//     </div>
//   );
// }

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './Login.css'; // Assuming you'll save the CSS separately

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Both username and password are required');
      return;
    }

    api.post('/login', { username, password })
      .then((response) => {
        console.log(response.data);
        const { token, userId, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
        navigate('/');
      })
      .catch((error) => {
        // Check if the error has a response and display the message accordingly
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">🎬 MovieVerse Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
