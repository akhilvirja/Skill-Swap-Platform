
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
            console.log(res);
            if (res.data && Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
                setUsers([]); // fallback to empty array
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]); // also fallback on error
        }
    };
    fetchUsers();
}, [skill, availability,currentPage]);

    const filteredUsers = users.filter(user => {
        const matchesSkill =
            skill === '' ||
            user.skillsOffered.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
            user.skillsWanted.some(s => s.toLowerCase().includes(skill.toLowerCase()));

        const matchesAvailability =
            availability === '' ||
            user.availability.toLowerCase() === availability.toLowerCase();

        return matchesSkill && matchesAvailability;
    });

    const usersPerPage = 4;
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);


    return (
        <div className="home-container">
            <div className="filter-bar">
                <select onChange={(e) => setAvailability(e.target.value)}>
                    <option value="">Availability</option>
                    <option value="weekend">Weekends</option>
                    <option value="evening">Evenings</option>
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
