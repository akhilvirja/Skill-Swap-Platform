import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import UserCard from './Usercard';
import Pagination from './Pagination';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [skill, setSkill] = useState('');
    const [availability, setAvailability] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loggedIn, setLoggedIn] = useState(true); // Set this based on real auth

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/users/public`);
                const data = res.data.users || res.data;
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setUsers([]);
            }
        };
        fetchUsers();
    }, []); // Do not re-fetch on filter

    const filteredUsers = users.filter(user => {
        const offered = Array.isArray(user.skillsOffered) ? user.skillsOffered : [];
        const wanted = Array.isArray(user.skillsWanted) ? user.skillsWanted : [];
        const avail = Array.isArray(user.availability) ? user.availability : [];

        const matchesSkill =
            skill === '' ||
            offered.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
            wanted.some(s => s.toLowerCase().includes(skill.toLowerCase()));

        const matchesAvailability =
            availability === '' ||
            avail.some(a => a.toLowerCase() === availability.toLowerCase());

        return matchesSkill && matchesAvailability;
    });

    const usersPerPage = 4;
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    return (
        <div className="home-container">
            <div className="filter-bar">
                <select
                    value={availability}
                    onChange={(e) => {
                        setAvailability(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Availability</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by skill..."
                    value={skill}
                    onChange={(e) => {
                        setSkill(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {filteredUsers.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No users match your filter.
                </p>
            ) : (
                <div className="user-list">
                    {paginatedUsers.map(user => (
                        <UserCard key={user._id} user={user} loggedIn={loggedIn} />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};

export default HomePage;
