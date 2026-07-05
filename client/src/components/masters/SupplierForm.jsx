// client/src/components/masters/SupplierForm.jsx

import { useState } from "react";

export default function SupplierForm({
  initialValues = {
    code: "",
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    taxNumber: ""
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
        "Supplier code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Supplier name is required."
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
        <label>Supplier Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Supplier Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Contact Person</label>

        <input
          type="text"
          name="contactPerson"
          value={form.contactPerson}
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
        <label>Tax Number</label>

        <input
          type="text"
          name="taxNumber"
          value={form.taxNumber}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Supplier"}
      </button>
    </form>
  );
}
