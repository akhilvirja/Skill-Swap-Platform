import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        name: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201) {
        navigate('/login')
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
    if (err.message) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
   
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="subheading">Register to get started</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <div className="error-msg">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        <p className="subheading" style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
