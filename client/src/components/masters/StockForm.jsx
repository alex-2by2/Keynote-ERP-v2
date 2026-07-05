// client/src/components/masters/StockForm.jsx

import { useState } from "react";

export default function StockForm({
  items,
  warehouses,
  editing,
  initialValues = {
    item: items[0]?._id || "",
    warehouse: warehouses[0]?._id || "",
    quantity: "0"
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

    if (!form.item) {
      return setError(
        "Item is required."
      );
    }

    if (!form.warehouse) {
      return setError(
        "Warehouse is required."
      );
    }

    onSubmit({
      ...form,
      quantity: Number(form.quantity) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Item</label>

        <select
          name="item"
          value={form.item}
          onChange={handleChange}
          disabled={editing}
        >
          {items.map(item => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Warehouse</label>

        <select
          name="warehouse"
          value={form.warehouse}
          onChange={handleChange}
          disabled={editing}
        >
          {warehouses.map(warehouse => (
            <option
              key={warehouse._id}
              value={warehouse._id}
            >
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Quantity</label>

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          step="any"
          min="0"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Stock"}
      </button>
    </form>
  );
}
