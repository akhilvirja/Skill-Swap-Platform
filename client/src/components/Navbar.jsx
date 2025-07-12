import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, userProfilePic }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Skill Swapper</Link>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/swap-requests" className="nav-link">Swap Requests</Link>
            <Link to="/profile" className="nav-link">
            <img
              src={userProfilePic}
              alt="profile"
              className="profile-pic"
              title="Profile"
              />
              </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
