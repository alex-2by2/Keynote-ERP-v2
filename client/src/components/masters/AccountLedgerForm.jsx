// client/src/components/masters/AccountLedgerForm.jsx

import { useState } from "react";

export default function AccountLedgerForm({
  groups,
  initialValues = {
    code: "",
    name: "",
    accountGroup: groups[0]?._id || "",
    openingBalance: "0",
    openingBalanceType: "DEBIT",
    phone: "",
    email: ""
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
        "Ledger code is required."
      );
    }

    if (!form.name.trim()) {
      return setError(
        "Ledger name is required."
      );
    }

    if (!form.accountGroup) {
      return setError(
        "Account group is required."
      );
    }

    onSubmit({
      ...form,
      openingBalance:
        Number(form.openingBalance) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Ledger Code</label>

        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Ledger Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Account Group</label>

        <select
          name="accountGroup"
          value={form.accountGroup}
          onChange={handleChange}
        >
          {groups.map(group => (
            <option
              key={group._id}
              value={group._id}
            >
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Opening Balance</label>

        <input
          type="number"
          name="openingBalance"
          value={form.openingBalance}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div>
        <label>Opening Balance Type</label>

        <select
          name="openingBalanceType"
          value={form.openingBalanceType}
          onChange={handleChange}
        >
          <option value="DEBIT">Debit</option>
          <option value="CREDIT">Credit</option>
        </select>
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
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Ledger"}
      </button>
    </form>
  );
}
