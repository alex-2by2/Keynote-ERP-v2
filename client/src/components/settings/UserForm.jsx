// client/src/components/settings/UserForm.jsx

import { useState } from "react";

export default function UserForm({
  editing,
  initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee"
  },
  onSubmit,
  loading
}) {
  const [form, setForm] =
    useState(initialValues);

  const [error, setError] = useState("");

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

    setError("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      return setError(
        "First name is required."
      );
    }

    if (!form.lastName.trim()) {
      return setError(
        "Last name is required."
      );
    }

    if (!form.email.trim()) {
      return setError(
        "Email is required."
      );
    }

    if (!editing && form.password.length < 8) {
      return setError(
        "Password must be at least 8 characters."
      );
    }

    const payload = { ...form };

    if (editing && !payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>First Name</label>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Last Name</label>

        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          {editing
            ? "New Password (leave blank to keep current)"
            : "Password"}
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Role</label>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save User"}
      </button>
    </form>
  );
}
