import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Feedback.css"; 

function Feedback({ onLogout }) {
  const [form, setForm] = useState({ rating: "", comment: "" });
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const ratingValue = parseFloat(form.rating);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      setMessage("Please enter a valid rating between 1.0 and 5.0");
      setSuccess(false);
      return;
    }
    try {
      await api.post("feedback/", form);
      setMessage("Feedback sent successfully! ✅");
      setSuccess(true);
      setForm({ rating: "", comment: "" });
    } catch {
      setMessage("Error submitting feedback");
      setSuccess(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
    navigate("/signin");
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-card">
          <h2 className="feedback-title">⭐ Share Your Feedback</h2>

          <form onSubmit={handleSubmit}>
            <div className="stars">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <span
                    key={index}
                    className="star"
                    onClick={() => setForm({ ...form, rating: ratingValue })}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(form.rating)}
                    style={{
                      color: ratingValue <= (hover || form.rating) ? "#ffc107" : "#e4e5e9",
                    }}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              name="rating"
              placeholder="Enter rating (1.0 - 5.0)"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              required
              className="feedback-input"
            />

            <textarea
              name="comment"
              placeholder="Write your feedback..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              className="feedback-textarea"
            />

            <button type="submit" className="feedback-btn">Submit Feedback</button>
          </form>

          {message && (
            <p className="feedback-message" style={{ color: success ? "green" : "red" }}>
              {message}
            </p>
          )}

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
