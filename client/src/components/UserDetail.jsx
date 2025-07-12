import { useParams } from 'react-router-dom';
import './UserDetail.css';
import { useState } from 'react';
import RequestModal from './Request'; // path to your RequestModal.jsx

const sampleUsers = [
  {
    _id: 1,
    name: 'Marc Demo',
    profilePhoto: 'https://i.pravatar.cc/150?img=3',
    skillsOffered: ['Photoshop', 'Excel'],
    skillsWanted: ['Python', 'UI Design'],
    availability: 'Weekends',
    location: 'New York, USA',
    bio: 'Creative designer with 5+ years of experience in digital arts.',
    rating: 4.5,
  },
  {
    _id: 2,
    name: 'Akhil',
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
    skillsOffered: ['React', 'Node.js'],
    skillsWanted: ['Machine Learning'],
    availability: 'Evenings',
    location: 'Ahmedabad, India',
    bio: 'Full-stack developer passionate about building web apps.',
    rating: 4.8,
  },
  {
    _id: 3,
    name: 'Joe Vills',
    profilePhoto: 'https://i.pravatar.cc/150?img=8',
    skillsOffered: ['Java', 'MongoDB'],
    skillsWanted: ['Graphic Design'],
    availability: 'Weekends',
    location: 'Berlin, Germany',
    bio: 'Backend engineer who loves data modeling and optimization.',
    rating: 4.2,
  },
  {
    _id: 4,
    name: 'Anaya Jain',
    profilePhoto: 'https://i.pravatar.cc/150?img=10',
    skillsOffered: ['C++', 'Python'],
    skillsWanted: ['UI/UX'],
    availability: 'Evenings',
    location: 'Delhi, India',
    bio: 'Student and aspiring software engineer with an eye for UI.',
    rating: 4.7,
  },
  {
    _id: 5,
    name: 'Dev Mehra',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
    skillsOffered: ['Photography'],
    skillsWanted: ['Web Development'],
    availability: 'Weekends',
    location: 'London, UK',
    bio: 'Street photographer exploring web technologies on weekends.',
    rating: 4.3,
  },
  {
    _id: 6,
    name: 'Nikita Rana',
    profilePhoto: 'https://i.pravatar.cc/150?img=13',
    skillsOffered: ['Excel', 'Data Entry'],
    skillsWanted: ['Python'],
    availability: 'Evenings',
    location: 'Pune, India',
    bio: 'Detail-oriented freelancer with a love for clean spreadsheets.',
    rating: 4.6,
  },
  {
    _id: 7,
    name: 'Karan Sethi',
    profilePhoto: 'https://i.pravatar.cc/150?img=15',
    skillsOffered: ['JavaScript', 'Express'],
    skillsWanted: ['React', 'MongoDB'],
    availability: 'Weekends',
    location: 'Toronto, Canada',
    bio: 'MERN stack enthusiast who enjoys code challenges.',
    rating: 4.4,
  },
  {
    _id: 8,
    name: 'Riya Shah',
    profilePhoto: 'https://i.pravatar.cc/150?img=16',
    skillsOffered: ['Video Editing'],
    skillsWanted: ['Excel', 'Photoshop'],
    availability: 'Evenings',
    location: 'Mumbai, India',
    bio: 'Passionate video editor creating reels and promos.',
    rating: 4.9,
  },
  {
    _id: 9,
    name: 'Zayn Ahmed',
    profilePhoto: 'https://i.pravatar.cc/150?img=18',
    skillsOffered: ['Linux', 'Docker'],
    skillsWanted: ['Kubernetes'],
    availability: 'Weekends',
    location: 'Dubai, UAE',
    bio: 'DevOps learner diving deep into containerization.',
    rating: 4.1,
  },
  {
    _id: 10,
    name: 'Meena Verma',
    profilePhoto: 'https://i.pravatar.cc/150?img=20',
    skillsOffered: ['Digital Marketing'],
    skillsWanted: ['SEO', 'Content Writing'],
    availability: 'Evenings',
    location: 'Sydney, Australia',
    bio: 'Digital marketer helping small businesses grow online.',
    rating: 4.6,
  }
];

const UserDetail = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const user = sampleUsers.find(u => u._id === parseInt(id));

  if (!user) return <h2 style={{ textAlign: 'center' }}>User not found</h2>;

  // Form submit handler
  const handleRequestSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const offer = formData.get('offer');
    const time = formData.get('time');
    const message = formData.get('message');

    console.log("Swap Request Sent:");
    console.log("To:", user.name);
    console.log("Offer:", offer);
    console.log("Preferred Time:", time);
    console.log("Message:", message);

    alert("Swap request sent!");
    setShowModal(false);
  };

  return (
    <div className="user-detail-wrapper">
      <div className="user-detail-container">
        <div className="user-left">
          <img src={user.profilePhoto} alt={user.name} className="profile-img" />
          <h2>{user.name}</h2>
          <p className="location">📍 {user.location}</p>
          <p className="rating">⭐ {user.rating} / 5</p>
          <p className="bio">{user.bio}</p>
        </div>

        <div className="user-right">
          <div className="section">
            <h3>Skills Offered</h3>
            <ul>{user.skillsOffered.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
          </div>

          <div className="section">
            <h3>Skills Wanted</h3>
            <ul>{user.skillsWanted.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
          </div>

          <div className="section">
            <h3>Availability</h3>
            <p>{user.availability}</p>
          </div>

          <button className="request-btn" onClick={() => setShowModal(true)}>
            Request Swap
          </button>
        </div>
      </div>

      {showModal && (
        <RequestModal
          user={user}
          onClose={() => setShowModal(false)}
          onSubmit={handleRequestSubmit}
        />
      )}
    </div>
  );
};

export default UserDetail;
