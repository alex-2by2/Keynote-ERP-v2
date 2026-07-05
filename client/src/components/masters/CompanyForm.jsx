// client/src/components/masters/CompanyForm.jsx

import { useState } from "react";

export default function CompanyForm({
  initialValues = {
    code: "",
    name: ""
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
        "Company code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Company name is required."
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
        <label>Company Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Company Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Company"}
      </button>
    </form>
  );
}
