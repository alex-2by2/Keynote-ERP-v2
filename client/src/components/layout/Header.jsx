// client/src/components/layout/Header.jsx

import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import { useAuth } from "../../store/authStore";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await AuthService.logout(refreshToken);
    } catch (error) {
      console.error(error);
    } finally {
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="header">
      <div>
        Welcome,
        {" "}
        {user?.name || "User"}
      </div>

      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}
