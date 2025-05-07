// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import { GiFilmProjector } from 'react-icons/gi';

// function Navbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');
//   const isLoggedIn = localStorage.getItem('token'); // Check if the user is logged in

//   // Search functionality
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
//         {/* Admin-only icons */}
//         {role === 'admin' && (
//           <>
//             <Link to="/manage-movies" title="Manage Movies">
//               <GiFilmProjector size={24} />
//             </Link>
//             <Link to="/manage-users" title="Manage Users">
//               <i className="fas fa-users-cog"></i> {/* Add an icon for managing users */}
//             </Link>
//             <Link to="/manage-watchlists" title="Manage Watchlists">
//               <i className="fas fa-list"></i>
//             </Link>
//             <Link to="/manage-reviews" title="Manage Reviews">
//               <i className="fas fa-comments"></i>
//             </Link>
//           </>
//         )}

//         {/* Conditional rendering of links based on login state */}
//         <Link to="/favorites"><i className="fas fa-heart"></i></Link>
//         <Link to="/watchlist"><i className="fas fa-film"></i></Link>
  
//         {isLoggedIn ? (
//           <>
//           <Link to="/change-password"><i className="fas fa-key"></i></Link>
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login"><i className="fas fa-user"></i></Link>
//             <Link to="/signup"><i className="fas fa-sign-in-alt"></i></Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { GiFilmProjector } from 'react-icons/gi';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('token');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) navigate(`/search?query=${query}`);
  };

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
        {isLoggedIn && role === 'admin' && (
          <>
            <Link to="/manage-movies" title="Manage Movies">
              <GiFilmProjector size={24} />
            </Link>
            <Link to="/manage-users" title="Manage Users">
              <i className="fas fa-users-cog"></i>
            </Link>
            <Link to="/manage-watchlists" title="Manage Watchlists">
              <i className="fas fa-list"></i>
            </Link>
            <Link to="/manage-reviews" title="Manage Reviews">
              <i className="fas fa-comments"></i>
            </Link>
            <Link to="/change-password" title="Change Password">
              <i className="fas fa-key"></i>
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}

        {isLoggedIn && role !== 'admin' && (
          <>
            <Link to="/favorites" title="Favorites"><i className="fas fa-heart"></i></Link>
            <Link to="/watchlist" title="Watchlist"><i className="fas fa-film"></i></Link>
            <Link to="/change-password" title="Change Password"><i className="fas fa-key"></i></Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" title="Login"><i className="fas fa-user"></i></Link>
            <Link to="/signup" title="Signup"><i className="fas fa-sign-in-alt"></i></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
