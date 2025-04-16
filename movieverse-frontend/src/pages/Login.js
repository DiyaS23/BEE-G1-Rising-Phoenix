// import { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';
// // import Navbar from '../components/Navbar';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     api.post('/login', { username, password })
//       .then(res => {
//         localStorage.setItem('token', res.data.token);
//         navigate('/');
//       })
//       .catch(err => alert("Invalid Credentials"));
//   };

//   return (
//     <>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="text" 
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsername(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)} 
//         />
//         <button type="submit">Login</button>
//       </form>
//     </>
//   );
// }

// export default Login;





// import { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false); // To manage the loading state
//   const [error, setError] = useState(''); // To display error messages
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true while awaiting response
//     setError(''); // Reset any previous errors

//     api.post('/login', { username, password })
//       .then(res => {
//         localStorage.setItem('token', res.data.token); // Store the token in localStorage
//         setLoading(false); // Set loading state to false once the response is received
//         navigate('/'); // Redirect to the home page (or any page you want after login)
//       })
//       .catch(err => {
//         setLoading(false); // Set loading to false when there is an error
//         setError('Invalid Credentials'); // Show error message
//       });
//   };

//   return (
//     <>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>Login</button>
//       </form>
//       {loading && <p>Loading...</p>} {/* Display loading message */}
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//     </>
//   );
// }

// export default Login;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation
// import api from '../api/api';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Make the login API request
//     api.post('/login', { username, password })
//       .then((response) => {
//         // On successful login, store token and user ID in localStorage
//         const { token, userId } = response.data;
//         localStorage.setItem('token', token);  // Store token in localStorage
//         localStorage.setItem('userId', userId); // Store user ID in localStorage

//         // Optionally, store other user details if needed

//         // Navigate to the home page or favorites page after login
//         navigate('/');
//       })
//       .catch((error) => {
//         setErrorMessage('Login failed. Please try again.');
//       });
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
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
        setErrorMessage('Login failed. Please try again.');
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

