import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const setIsLoggedIn = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log(response)

      if (response.status === 200) {
        console.log(response)
        // Save token or user info if returned
        const { token } = response.data;
        localStorage.setItem('token', token); // store token securely
        // Redirect to dashboard or home
        navigate('/');
        setIsLoggedIn(true)
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subheading">Login to your account</p>

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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="subheading" style={{ marginTop: '15px' }}>
  Don't have an account? <Link to="/signup">Sign up</Link>
</p>

      </form>
    </div>
  );
};

export default Login;
