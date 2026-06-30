import { useState } from "react";

export default function LoginForm({
  loading,
  setLoading
}) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      // Next Commit:
      // Backend Login API
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
