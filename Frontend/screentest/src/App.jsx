import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Feedback from "./components/Feedback";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />

        <Route
          path="/feedback"
          element={
            user ? (
              <Feedback onLogout={handleLogout} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
