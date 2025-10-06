import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css"; // keep or create this file (we used earlier)

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const dashboard = location.state?.dashboard;

  if (!dashboard) {
    navigate("/admin");
    return null;
  }

  const handleLogout = () => {
    navigate("/admin"); // back to admin login
  };

  // sentiment_counts is an object: { "neutral": 120, "hate": 23, ... }
  const sentimentCounts = dashboard.sentiment_counts || {};

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
      </nav>

      <div className="admin-container">
        <div className="admin-card">
          <h1 className="admin-title">Admin Dashboard</h1>

          <h2>Sentiment Distribution</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sentiment</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(sentimentCounts).length === 0 ? (
                <tr><td colSpan="2">No sentiment data available</td></tr>
              ) : (
                Object.entries(sentimentCounts).map(([sentiment, count]) => (
                  <tr key={sentiment}>
                    <td style={{ textTransform: "capitalize" }}>{sentiment}</td>
                    <td>{count}</td>
                  </tr>
                ))
              )}
              <tr>
                <td style={{ fontWeight: 700 }}>Total</td>
                <td style={{ fontWeight: 700 }}>{dashboard.total_feedbacks}</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ marginTop: "24px" }}>All Feedbacks</h2>
          <table className="admin-table" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.feedbacks.map(f => (
                <tr key={f.id}>
                  <td>{f.user}</td>
                  <td>{f.rating}</td>
                  <td>{f.comment}</td>
                  <td>{f.sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
