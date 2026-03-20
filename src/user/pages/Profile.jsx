import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{user?.name[0].toUpperCase()}</div>
        <h1>{user?.name}</h1>
        <p className="profile-email">{user?.email}</p>

        <div className="profile-sections">
          <div className="profile-section">
            <h3>Account Details</h3>
            <div className="profile-info-row">
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>
            <div className="profile-info-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
            <div className="profile-info-row">
              <span>Member Since</span>
              <strong>2025</strong>
            </div>
          </div>

          <div className="profile-section">
            <h3>My Orders</h3>
            <div className="empty-orders">
              <p>You haven't placed any orders yet.</p>
              <a
                href="/shop"
                className="btn-hero-primary"
                style={{ display: "inline-block", marginTop: "1rem" }}
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </main>
  );
}
