import { useState } from "react";
import { Navigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../store/authStore";

export default function Login() {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Keynote ERP</h1>
            <p>Sign in to continue</p>
          </div>

          <LoginForm
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
}
