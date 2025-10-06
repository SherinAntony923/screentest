import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../styles/Signin.css"; 

function Signin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("signin/", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", form.username);

      setMessage("Login successful!");
      onLogin(form.username);
      navigate("/feedback");
    } catch (err) {
      setMessage("Signin failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="signin-page">
      <nav className="signin-nav">
        <button className="home-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>
      </nav>

      <div className="signin-container">
        <div className="signin-card">
          <h2 className="signin-title">Sign In</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="signin-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="signin-input"
            />

            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>

          <p className="signin-message">{message}</p>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary fw-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
