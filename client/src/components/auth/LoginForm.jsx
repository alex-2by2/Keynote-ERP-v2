import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import { useAuth } from "../../store/authStore";

export default function LoginForm({
  loading,
  setLoading
}) {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response =
        await AuthService.login(form);

      login({
        accessToken:
          response.accessToken,
        user: response.user
      });

      navigate("/app", {
        replace: true
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Signing In..."
          : "Sign In"}
      </button>
    </form>
  );
}
