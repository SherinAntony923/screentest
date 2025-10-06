import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setMessage("Signup successful! Redirecting to Sign In...");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setMessage("Signup failed!");
    }
  };

  return (
    <div className="signup-page">
      <nav className="signup-nav">
        <button className="home-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>
      </nav>

      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
            />

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          {message && <p className="signup-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
