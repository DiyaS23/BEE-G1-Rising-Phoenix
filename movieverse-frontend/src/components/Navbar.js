// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function Navbar() {
//   const [query, setQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?query=${query}`);
//   };

//   return (
//     <nav className="navbar">
//       <h1><Link to="/">MovieVerse</Link></h1>
//       <form onSubmit={handleSearch}>
//         <input 
//           type="text" 
//           placeholder="Search movies..." 
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} 
//         />
//         <button type="submit">Search</button>
//       </form>
//       <div>
//         <Link to="/favorites">Favorites</Link>
//         <Link to="/watchlist">Watchlist</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import { GiFilmProjector } from 'react-icons/gi';

// function Navbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');
//   const isLoggedIn = localStorage.getItem('token');
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = e.target.search.value;
//     if (query) navigate(`/search?query=${query}`);
//   };
//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userId');
//     alert('Logged out successfully!');
//     navigate('/login');
//   };
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">MovieVerse</Link>
//       </div>
      
//       <form className="search-bar" onSubmit={handleSearch}>
//         <input type="text" name="search" placeholder="Search movies..." />
//         <button type="submit"><i className="fas fa-search"></i></button>
//       </form>

//       <div className="navbar-icons">
//        {/* Only show this icon for admin users */}
//   {role === 'admin' && (
//     <Link to="/manage-movies" title="Manage Movies">
//       <GiFilmProjector size={24} />
//     </Link>
//   )}
//   {/* Conditional rendering of links based on login state */}
//   <Link to="/favorites"><i className="fas fa-heart"></i></Link>
//         <Link to="/watchlist"><i className="fas fa-film"></i></Link>

//         {isLoggedIn ? (
//           <>
//             {/* Show Logout button when user is logged in */}
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             {/* Show Login and Signup links if not logged in */}
//             <Link to="/login"><i className="fas fa-user"></i></Link>
//             <Link to="/signup"><i className="fas fa-sign-in-alt"></i></Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
//         {/* <Link to="/favorites"><i className="fas fa-heart"></i></Link>
//         <Link to="/watchlist"><i className="fas fa-film"></i></Link>
//         <Link to="/login"><i className="fas fa-user"></i></Link>
//         <Link to="/signup"><i className="fas fa-sign-in-alt"></i></Link>
//       </div>
//     </nav>
//   ); */}
// }

// export default Navbar;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { GiFilmProjector } from 'react-icons/gi';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('token'); // Check if the user is logged in

  // Search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) navigate(`/search?query=${query}`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MovieVerse</Link>
      </div>
      
      <form className="search-bar" onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search movies..." />
        <button type="submit"><i className="fas fa-search"></i></button>
      </form>

      <div className="navbar-icons">
        {/* Admin-only icon */}
        {role === 'admin' && (
          <Link to="/manage-movies" title="Manage Movies">
            <GiFilmProjector size={24} />
          </Link>
        )}

        {/* Conditional rendering of links based on login state */}
        <Link to="/favorites"><i className="fas fa-heart"></i></Link>
        <Link to="/watchlist"><i className="fas fa-film"></i></Link>

        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login"><i className="fas fa-user"></i></Link>
            <Link to="/signup"><i className="fas fa-sign-in-alt"></i></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
