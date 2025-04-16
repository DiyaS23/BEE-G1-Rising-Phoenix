// import React, { useEffect, useState } from "react";

// function App() {
//   const [users, setUsers] = useState([]);

//   // Login function
//   function login(username, password) {
//     fetch("http://localhost:3002/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ username, password })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.token) {
//           // Save the token to localStorage
//           localStorage.setItem("token", data.token);
//           alert("Login successful!");
//         } else {
//           alert("Login failed!");
//         }
//       })
//       .catch(err => console.error("Login error:", err));
//   }

//   // Fetch users after login
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No token found — please log in first.");
//       return;
//     }

//     fetch("http://localhost:3002/users", {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error("Unauthorized or error fetching users.");
//         }
//         return res.json();
//       })
//       .then(data => {
//         if (Array.isArray(data)) {
//           setUsers(data);
//         } else {
//           console.error("Data received is not an array:", data);
//         }
//       })
//       .catch(err => console.error("Error fetching users:", err));
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to MovieVerse</h1>
      
//       {/* Login form */}
//       <div>
//         <input type="text" placeholder="Username" id="username" />
//         <input type="password" placeholder="Password" id="password" />
//         <button onClick={() => {
//           const username = document.getElementById("username").value;
//           const password = document.getElementById("password").value;
//           login(username, password);
//         }}>
//           Login
//         </button>
//       </div>

//       <h2>Users List</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.username || user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Favorites from './pages/Favorites';
// import Watchlist from './pages/Watchlists';
// import SearchResults from './pages/SearchResults';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/favorites" element={<Favorites />} />
//         <Route path="/watchlist" element={<Watchlist />} />
//         <Route path="/search" element={<SearchResults />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Favorites from './pages/Favorites';
// import Watchlist from './pages/Watchlists';
// import SearchResults from './pages/SearchResults';
// import ProtectedRoute from './components/ProtectedRoute'; // import this
// import Navbar from './components/Navbar';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
        
//         {/* Protected Routes */}
//         <Route
//           path="/favorites"
//           element={
//             <ProtectedRoute>
//               <Favorites />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/watchlist"
//           element={
//             <ProtectedRoute>
//               <Watchlist />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/search" element={<SearchResults />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlists';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';  // Navbar import
import Signup from './pages/Signup';
import ManageMovies from './pages/ManageMovies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route path="/search" element={<SearchResults />} />
        {/* Admin-only pages */}
        <Route path="/manage-movies" element={<ManageMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
