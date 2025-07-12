import './Home.css';
import { Link } from 'react-router-dom';

const UserCard = ({ user, loggedIn }) => {
  return (
    
    <div className="user-card">
        <Link to={`/user/${user._id}`} className="user-card-link">
      <img src={user.profilePhoto || '/default-avatar.png'} alt="Profile" />
      </Link>
      <h3>{user.name}</h3>
      <p><strong>Skills Offered:</strong> {user.skillsOffered.join(', ')}</p>
      <p><strong>Skills Wanted:</strong> {user.skillsWanted.join(', ')}</p>
      <p><strong>Availability:</strong> {user.availability}</p>
      <button disabled={!loggedIn} className="request-btn">
        {loggedIn ? 'Request' : 'Login to Request'}
      </button>
    </div>
  );
};

export default UserCard;
