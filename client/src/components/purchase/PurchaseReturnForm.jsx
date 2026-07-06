// client/src/components/purchase/PurchaseReturnForm.jsx

import { useState } from "react";

export default function PurchaseReturnForm({
  suppliers,
  warehouses,
  items,
  initialValues = {
    supplier: suppliers[0]?._id || "",
    warehouse: warehouses[0]?._id || "",
    returnNumber: "",
    returnDate: "",
    item: items[0]?._id || "",
    quantity: "1",
    unitCost: String(
      items[0]?.purchasePrice ?? 0
    ),
    reason: ""
  },
  onSubmit,
  loading
}) {
  const [form, setForm] =
    useState(initialValues);

  const [error, setError] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;

    const next = {
      ...form,
      [name]: value
    };

    if (name === "item") {
      const selected = items.find(
        i => i._id === value
      );

      next.unitCost = String(
        selected?.purchasePrice ?? 0
      );
    }

    setForm(next);
    setError("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.supplier) {
      return setError(
        "Supplier is required."
      );
    }

    if (!form.warehouse) {
      return setError(
        "Warehouse is required."
      );
    }

    if (!form.returnNumber.trim()) {
      return setError(
        "Return number is required."
      );
    }

    if (Number(form.quantity) <= 0) {
      return setError(
        "Quantity must be greater than zero."
      );
    }

    onSubmit({
      supplier: form.supplier,
      warehouse: form.warehouse,
      returnNumber: form.returnNumber,
      returnDate: form.returnDate,
      items: [
        {
          item: form.item,
          quantity: Number(form.quantity),
          unitCost: Number(form.unitCost),
          reason: form.reason
        }
      ]
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Supplier</label>

        <select
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
        >
          {suppliers.map(supplier => (
            <option
              key={supplier._id}
              value={supplier._id}
            >
              {supplier.code} - {supplier.name}
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
        <label>Return Number</label>

        <input
          type="text"
          name="returnNumber"
          value={form.returnNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Return Date</label>

        <input
          type="date"
          name="returnDate"
          value={form.returnDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Item</label>

        <select
          name="item"
          value={form.item}
          onChange={handleChange}
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
        <label>Quantity</label>

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="0.01"
          step="any"
        />
      </div>

      <div>
        <label>Unit Cost</label>

        <input
          type="number"
          name="unitCost"
          value={form.unitCost}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label>Reason</label>

        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Damaged, wrong item..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Return"}
      </button>
    </form>
  );
}
