import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


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
