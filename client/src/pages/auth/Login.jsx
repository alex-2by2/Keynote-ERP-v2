import { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate
} from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import SetupService from "../../services/setup.service";
import { useAuth } from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkSetup() {
      try {
        const response = await SetupService.getStatus();

        if (
          isMounted &&
          response?.success &&
          !response.data?.initialized
        ) {
          navigate("/setup", {
            replace: true
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkSetup();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isAuthenticated) {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
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
