import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px", 
      }}
    >
      <Container
        style={{
          maxWidth: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "100%",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
            backgroundColor: "#ffffff",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          className="home-card"
        >
          <Card.Body>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#203a43",
                marginBottom: "15px",
              }}
            >
              Welcome to Our Platform 🎉
            </h1>
            <p
              style={{
                color: "#555",
                marginBottom: "35px",
                fontSize: "16px",
              }}
            >
              Please sign up, sign in, or login as an admin.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <Button
                style={{
                  backgroundColor: "#1abc9c",
                  border: "none",
                  fontWeight: "600",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  color: "#fff",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/signup")}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                ✨ Signup
              </Button>

              <Button
                style={{
                  backgroundColor: "#3498db",
                  border: "none",
                  fontWeight: "600",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  color: "#fff",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/signin")}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                🔐 Signin
              </Button>

              <Button
                style={{
                  backgroundColor: "#34495e",
                  border: "none",
                  fontWeight: "600",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  color: "#fff",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/admin")}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                🔑 Admin Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
