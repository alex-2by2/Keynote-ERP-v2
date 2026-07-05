// client/src/components/masters/ItemCategoryForm.jsx

import { useState } from "react";

export default function ItemCategoryForm({
  initialValues = {
    code: "",
    name: "",
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
        "Category code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Category name is required."
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
        <label>Category Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Category Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
          : "Save Category"}
      </button>
    </form>
  );
}
