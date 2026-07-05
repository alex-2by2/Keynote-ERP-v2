// client/src/components/masters/WarehouseForm.jsx

import { useState } from "react";

export default function WarehouseForm({
  branches,
  initialValues = {
    code: "",
    name: "",
    address: "",
    branch: branches[0]?._id || ""
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
        "Warehouse code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Warehouse name is required."
      );
    }

    if (!form.branch) {
      return setError(
        "Branch is required."
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
        <label>Warehouse Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Warehouse Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Branch</label>

        <select
          name="branch"
          value={form.branch}
          onChange={handleChange}
        >
          {branches.map(branch => (
            <option
              key={branch._id}
              value={branch._id}
            >
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Address</label>

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Warehouse"}
      </button>
    </form>
  );
}
