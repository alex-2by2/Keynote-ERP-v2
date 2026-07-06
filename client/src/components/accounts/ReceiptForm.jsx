// client/src/components/accounts/ReceiptForm.jsx

import { useState } from "react";

export default function ReceiptForm({
  customers,
  salesInvoices,
  ledgers,
  initialValues = {
    customer: customers[0]?._id || "",
    salesInvoice: "",
    accountLedger: ledgers[0]?._id || "",
    receiptNumber: "",
    receiptDate: "",
    receiptMethod: "CASH",
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

  const customerInvoices = salesInvoices.filter(
    invoice =>
      (invoice.customer?._id ||
        invoice.customer) === form.customer
  );

  const handleSubmit = event => {
    event.preventDefault();

    if (!form.customer) {
      return setError(
        "Customer is required."
      );
    }

    if (!form.accountLedger) {
      return setError(
        "Account ledger is required."
      );
    }

    if (!form.receiptNumber.trim()) {
      return setError(
        "Receipt number is required."
      );
    }

    if (Number(form.amount) <= 0) {
      return setError(
        "Amount must be greater than zero."
      );
    }

    onSubmit({
      ...form,
      salesInvoice: form.salesInvoice || null,
      amount: Number(form.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="error-message">{error}</p>
      )}

      <div>
        <label>Customer</label>

        <select
          name="customer"
          value={form.customer}
          onChange={handleChange}
        >
          {customers.map(customer => (
            <option
              key={customer._id}
              value={customer._id}
            >
              {customer.code} - {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          Against Sales Invoice (optional)
        </label>

        <select
          name="salesInvoice"
          value={form.salesInvoice}
          onChange={handleChange}
        >
          <option value="">
            — On account —
          </option>

          {customerInvoices.map(invoice => (
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
        <label>Receipt Number</label>

        <input
          type="text"
          name="receiptNumber"
          value={form.receiptNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Receipt Date</label>

        <input
          type="date"
          name="receiptDate"
          value={form.receiptDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Method</label>

        <select
          name="receiptMethod"
          value={form.receiptMethod}
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
          : "Save Receipt"}
      </button>
    </form>
  );
}
