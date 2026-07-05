// client/src/components/masters/ItemForm.jsx

import { useState } from "react";

export default function ItemForm({
  categories,
  units,
  initialValues = {
    code: "",
    sku: "",
    name: "",
    category: categories[0]?._id || "",
    unit: units[0]?._id || "",
    barcode: "",
    hsnCode: "",
    purchasePrice: "0",
    sellingPrice: "0",
    minimumStock: "0"
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
        "Item code is required."
      );
    }

    if (!form.sku.trim()) {
      return setError(
        "SKU is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Item name is required."
      );
    }

    if (!form.category) {
      return setError(
        "Category is required."
      );
    }

    if (!form.unit) {
      return setError(
        "Unit is required."
      );
    }

    onSubmit({
      ...form,
      purchasePrice:
        Number(form.purchasePrice) || 0,
      sellingPrice:
        Number(form.sellingPrice) || 0,
      minimumStock:
        Number(form.minimumStock) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Item Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>SKU</label>

        <input
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Item Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Category</label>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Unit</label>

        <select
          name="unit"
          value={form.unit}
          onChange={handleChange}
        >
          {units.map(unit => (
            <option
              key={unit._id}
              value={unit._id}
            >
              {unit.name} ({unit.symbol})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Barcode</label>

        <input
          type="text"
          name="barcode"
          value={form.barcode}
          onChange={handleChange}
          placeholder="Optional — for scanning"
        />
      </div>

      <div>
        <label>HSN Code</label>

        <input
          type="text"
          name="hsnCode"
          value={form.hsnCode}
          onChange={handleChange}
          placeholder="Optional — for GST"
        />
      </div>

      <div>
        <label>Purchase Price</label>

        <input
          type="number"
          name="purchasePrice"
          value={form.purchasePrice}
          onChange={handleChange}
          step="0.01"
          min="0"
        />
      </div>

      <div>
        <label>Selling Price</label>

        <input
          type="number"
          name="sellingPrice"
          value={form.sellingPrice}
          onChange={handleChange}
          step="0.01"
          min="0"
        />
      </div>

      <div>
        <label>
          Minimum Stock (reorder level)
        </label>

        <input
          type="number"
          name="minimumStock"
          value={form.minimumStock}
          onChange={handleChange}
          step="1"
          min="0"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Item"}
      </button>
    </form>
  );
}
