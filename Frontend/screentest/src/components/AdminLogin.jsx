import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminLogin.css"; 

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin-login/", form);
      navigate("/admin-dashboard", { state: { dashboard: res.data } });
    } catch (err) {
      setMessage("Admin login failed: Invalid credentials");
    }
  };

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <button onClick={() => navigate("/")} className="home-btn">
          🏠 Home
        </button>
      </nav>

      <div className="admin-container">
        <div className="admin-card">
          <h2 className="admin-title">Admin Login</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="admin-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="admin-input"
            />

            <button type="submit" className="admin-btn">
              Login
            </button>
          </form>

          <p className="admin-message">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
