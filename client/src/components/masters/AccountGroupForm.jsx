// client/src/components/masters/AccountGroupForm.jsx

import { useState } from "react";

export default function AccountGroupForm({
  initialValues = {
    code: "",
    name: "",
    nature: "ASSET",
    description: ""
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
        "Group code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Group name is required."
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
        <label>Group Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Group Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nature</label>

        <select
          name="nature"
          value={form.nature}
          onChange={handleChange}
        >
          <option value="ASSET">Asset</option>
          <option value="LIABILITY">Liability</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="EQUITY">Equity</option>
        </select>
      </div>

      <div>
        <label>Description</label>

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Group"}
      </button>
    </form>
  );
}
