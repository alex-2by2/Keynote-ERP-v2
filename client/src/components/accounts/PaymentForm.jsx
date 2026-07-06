// client/src/components/accounts/PaymentForm.jsx

import { useState } from "react";

export default function PaymentForm({
  suppliers,
  purchaseInvoices,
  ledgers,
  initialValues = {
    supplier: suppliers[0]?._id || "",
    purchaseInvoice: "",
    accountLedger: ledgers[0]?._id || "",
    paymentNumber: "",
    paymentDate: "",
    paymentMethod: "CASH",
    referenceNumber: "",
    amount: "0",
    remarks: ""
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

  const supplierInvoices =
    purchaseInvoices.filter(
      invoice =>
        (invoice.supplier?._id ||
          invoice.supplier) === form.supplier
    );

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.supplier) {
      return setError(
        "Supplier is required."
      );
    }

    if (!form.accountLedger) {
      return setError(
        "Account ledger is required."
      );
    }

    if (!form.paymentNumber.trim()) {
      return setError(
        "Payment number is required."
      );
    }

    if (Number(form.amount) <= 0) {
      return setError(
        "Amount must be greater than zero."
      );
    }

    onSubmit({
      ...form,
      purchaseInvoice:
        form.purchaseInvoice || null,
      amount: Number(form.amount)
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
        <label>
          Against Purchase Invoice (optional)
        </label>

        <select
          name="purchaseInvoice"
          value={form.purchaseInvoice}
          onChange={handleChange}
        >
          <option value="">
            — On account —
          </option>

          {supplierInvoices.map(invoice => (
            <option
              key={invoice._id}
              value={invoice._id}
            >
              {invoice.invoiceNumber} (
              {invoice.grandTotal})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Account Ledger</label>

        <select
          name="accountLedger"
          value={form.accountLedger}
          onChange={handleChange}
        >
          {ledgers.map(ledger => (
            <option
              key={ledger._id}
              value={ledger._id}
            >
              {ledger.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Payment Number</label>

        <input
          type="text"
          name="paymentNumber"
          value={form.paymentNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Payment Date</label>

        <input
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Method</label>

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option value="CASH">Cash</option>
          <option value="BANK">Bank</option>
          <option value="CHEQUE">Cheque</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="NEFT">NEFT</option>
          <option value="RTGS">RTGS</option>
          <option value="IMPS">IMPS</option>
        </select>
      </div>

      <div>
        <label>Reference Number</label>

        <input
          type="text"
          name="referenceNumber"
          value={form.referenceNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Amount</label>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          step="0.01"
          min="0.01"
        />
      </div>

      <div>
        <label>Remarks</label>

        <input
          type="text"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Payment"}
      </button>
    </form>
  );
}
