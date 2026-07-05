// client/src/components/masters/BranchForm.jsx

import { useState } from "react";

export default function BranchForm({
  initialValues = {
    code: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: ""
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

    if (!form.code.trim()) {
      return setError(
        "Branch code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Branch name is required."
      );
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Branch Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Branch Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
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
        <label>Phone</label>

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>City</label>

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>State</label>

        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Branch"}
      </button>
    </form>
  );
}
