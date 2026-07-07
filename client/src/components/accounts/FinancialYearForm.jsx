// client/src/components/accounts/FinancialYearForm.jsx

import { useState } from "react";

export default function FinancialYearForm({
  initialValues = {
    code: "",
    name: "",
    startDate: "",
    endDate: "",
    isCurrent: false
  },
  onSubmit,
  loading
}) {
  const [form, setForm] =
    useState(initialValues);

  const [error, setError] = useState("");

  const handleChange = event => {
    const { name, type, checked, value } =
      event.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : value
    });

    setError("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.code.trim()) {
      return setError(
        "Code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Name is required."
      );
    }

    if (!form.startDate || !form.endDate) {
      return setError(
        "Start and end dates are required."
      );
    }

    if (
      new Date(form.startDate) >=
      new Date(form.endDate)
    ) {
      return setError(
        "End date must be after start date."
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
        <label>Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="FY2526"
        />
      </div>

      <div>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="FY 2025-26"
        />
      </div>

      <div>
        <label>Start Date</label>

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date</label>

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="checkbox-field">
        <input
          type="checkbox"
          id="isCurrent"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={handleChange}
        />

        <label htmlFor="isCurrent">
          Set as current financial year
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Financial Year"}
      </button>
    </form>
  );
}
