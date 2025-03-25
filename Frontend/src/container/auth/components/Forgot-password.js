import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../auth.css";
const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">Forgot Password</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="form-submit-btn" type="submit">Send Email</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="signup-link">
        Don't have an account? <Link to="/login" className="nav-link">Login</Link>
      </p>
    </div>
  );
};

export default Forgotpassword;

