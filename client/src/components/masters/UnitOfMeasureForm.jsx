// client/src/components/masters/UnitOfMeasureForm.jsx

import { useState } from "react";

export default function UnitOfMeasureForm({
  initialValues = {
    code: "",
    name: "",
    symbol: "",
    category: "",
    baseUnit: false,
    conversionFactor: "1"
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
        "Unit code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Unit name is required."
      );
    }

    if (!form.symbol.trim()) {
      return setError(
        "Symbol is required."
      );
    }

    if (!form.category.trim()) {
      return setError(
        "Category (e.g. Weight, Volume, Count) is required."
      );
    }

    onSubmit({
      ...form,
      conversionFactor: form.baseUnit
        ? 1
        : Number(form.conversionFactor) || 1
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Unit Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Unit Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Symbol</label>

        <input
          type="text"
          name="symbol"
          value={form.symbol}
          onChange={handleChange}
          placeholder="kg, pcs, ltr..."
        />
      </div>

      <div>
        <label>Category</label>

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Weight, Volume, Count..."
        />
      </div>

      <div className="checkbox-field">
        <input
          type="checkbox"
          id="baseUnit"
          name="baseUnit"
          checked={form.baseUnit}
          onChange={handleChange}
        />

        <label htmlFor="baseUnit">
          Base unit for this category
        </label>
      </div>

      {!form.baseUnit && (
        <div>
          <label>
            Conversion Factor (relative to base unit)
          </label>

          <input
            type="number"
            name="conversionFactor"
            value={form.conversionFactor}
            onChange={handleChange}
            step="any"
            min="0.000001"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Unit"}
      </button>
    </form>
  );
}
