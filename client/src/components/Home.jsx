import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import UserCard from './Usercard';
import Pagination from './Pagination';

const HomePage = () => {


    const sampleUsers = [
        {
            _id: 1,
            name: 'Marc Demo',
            profilePhoto: 'https://i.pravatar.cc/150?img=3',
            skillsOffered: ['Photoshop', 'Excel'],
            skillsWanted: ['Python', 'UI Design'],
            availability: 'Weekends',
        },
        {
            _id: 2,
            name: 'Akhil',
            profilePhoto: 'https://i.pravatar.cc/150?img=5',
            skillsOffered: ['React', 'Node.js'],
            skillsWanted: ['Machine Learning'],
            availability: 'Evenings',
        },
        {
            _id: 3,
            name: 'Joe Vills',
            profilePhoto: 'https://i.pravatar.cc/150?img=8',
            skillsOffered: ['Java', 'MongoDB'],
            skillsWanted: ['Graphic Design'],
            availability: 'Weekends',
        },
        {
            _id: 4,
            name: 'Anaya Jain',
            profilePhoto: 'https://i.pravatar.cc/150?img=10',
            skillsOffered: ['C++', 'Python'],
            skillsWanted: ['UI/UX'],
            availability: 'Evenings',
        },
        {
            _id: 5,
            name: 'Dev Mehra',
            profilePhoto: 'https://i.pravatar.cc/150?img=12',
            skillsOffered: ['Photography'],
            skillsWanted: ['Web Development'],
            availability: 'Weekends',
        },
        {
            _id: 6,
            name: 'Nikita Rana',
            profilePhoto: 'https://i.pravatar.cc/150?img=13',
            skillsOffered: ['Excel', 'Data Entry'],
            skillsWanted: ['Python'],
            availability: 'Evenings',
        },
        {
            _id: 7,
            name: 'Karan Sethi',
            profilePhoto: 'https://i.pravatar.cc/150?img=15',
            skillsOffered: ['JavaScript', 'Express'],
            skillsWanted: ['React', 'MongoDB'],
            availability: 'Weekends',
        },
        {
            _id: 8,
            name: 'Riya Shah',
            profilePhoto: 'https://i.pravatar.cc/150?img=16',
            skillsOffered: ['Video Editing'],
            skillsWanted: ['Excel', 'Photoshop'],
            availability: 'Evenings',
        },
        {
            _id: 9,
            name: 'Zayn Ahmed',
            profilePhoto: 'https://i.pravatar.cc/150?img=18',
            skillsOffered: ['Linux', 'Docker'],
            skillsWanted: ['Kubernetes'],
            availability: 'Weekends',
        },
        {
            _id: 10,
            name: 'Meena Verma',
            profilePhoto: 'https://i.pravatar.cc/150?img=20',
            skillsOffered: ['Digital Marketing'],
            skillsWanted: ['SEO', 'Content Writing'],
            availability: 'Evenings',
        }
    ];


    const [users, setUsers] = useState([]);
    const [skill, setSkill] = useState('');
    const [availability, setAvailability] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loggedIn, setLoggedIn] = useState(true); // Set this based on real auth

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`http://localhost:5000/api/users`, {
                params: { skill, availability, page: currentPage },
            });
            setUsers(res.data.users); // Make sure your backend filters private profiles
        };
        fetchUsers();
    }, [skill, availability, currentPage]);

    const usersPerPage = 4;

    const filteredUsers = sampleUsers.filter(user => {
        const matchesSkill =
            skill === '' ||
            user.skillsOffered.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
            user.skillsWanted.some(s => s.toLowerCase().includes(skill.toLowerCase()));

        const matchesAvailability =
            availability === '' ||
            user.availability.toLowerCase() === availability.toLowerCase();

        return matchesSkill && matchesAvailability;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);


    return (
        <div className="home-container">
            <div className="filter-bar">
                <select onChange={(e) => setAvailability(e.target.value)}>
                    <option value="">Availability</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by skill..."
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
            </div>

            <div className="user-list">
                {paginatedUsers.map(user => (
                    <UserCard key={user._id} user={user} loggedIn={loggedIn} />
                ))}
            </div>


            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />

        </div>
    );
};

export default HomePage;
