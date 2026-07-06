// client/src/pages/accounts/Accounts.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import AccountGroupService from "../../services/accountGroup.service";
import AccountLedgerService from "../../services/accountLedger.service";
import CustomerService from "../../services/customer.service";
import SupplierService from "../../services/supplier.service";
import SalesInvoiceService from "../../services/salesInvoice.service";
import PurchaseInvoiceService from "../../services/purchaseInvoice.service";
import ReceiptService from "../../services/receipt.service";
import PaymentService from "../../services/payment.service";
import AccountGroupForm from "../../components/masters/AccountGroupForm";
import AccountLedgerForm from "../../components/masters/AccountLedgerForm";
import ReceiptForm from "../../components/accounts/ReceiptForm";
import PaymentForm from "../../components/accounts/PaymentForm";

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function generateNumber(prefix, existingCount) {
  const stamp = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const sequence = String(existingCount + 1).padStart(4, "0");

  return `${prefix}${stamp}${sequence}`;
}

export default function Accounts() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [tab, setTab] = useState("setup");

  const [groups, setGroups] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [salesInvoices, setSalesInvoices] = useState([]);
  const [purchaseInvoices, setPurchaseInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savingGroup, setSavingGroup] = useState(false);
  const [savingLedger, setSavingLedger] = useState(false);
  const [savingReceipt, setSavingReceipt] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  const [editingGroup, setEditingGroup] = useState(null);
  const [editingLedger, setEditingLedger] = useState(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [
        groupResponse,
        ledgerResponse,
        customerResponse,
        supplierResponse,
        salesInvoiceResponse,
        purchaseInvoiceResponse,
        receiptResponse,
        paymentResponse
      ] = await Promise.all([
        AccountGroupService.getAll({ company }),
        AccountLedgerService.getAll({ company }),
        CustomerService.getAll({ company }),
        SupplierService.getAll({ company }),
        SalesInvoiceService.getAll({ company }),
        PurchaseInvoiceService.getAll({ company }),
        ReceiptService.getAll({ company }),
        PaymentService.getAll({ company })
      ]);

      setGroups(groupResponse.data || []);
      setLedgers(ledgerResponse.data || []);
      setCustomers(customerResponse.data || []);
      setSuppliers(supplierResponse.data || []);
      setSalesInvoices(salesInvoiceResponse.data || []);
      setPurchaseInvoices(purchaseInvoiceResponse.data || []);
      setReceipts(receiptResponse.data || []);
      setPayments(paymentResponse.data || []);
    } catch (err) {
      setError("Unable to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  const loadGroups = async () => {
    const response = await AccountGroupService.getAll({
      company: companyId
    });

    setGroups(response.data || []);
  };

  const loadLedgers = async () => {
    const response = await AccountLedgerService.getAll({
      company: companyId
    });

    setLedgers(response.data || []);
  };

  const loadReceipts = async () => {
    const response = await ReceiptService.getAll({
      company: companyId
    });

    const loaded = response.data || [];

    setReceipts(loaded);

    return loaded;
  };

  const loadPayments = async () => {
    const response = await PaymentService.getAll({
      company: companyId
    });

    const loaded = response.data || [];

    setPayments(loaded);

    return loaded;
  };

  const handleSaveGroup = async data => {
    const payload = { ...data, company: companyId };

    try {
      setSavingGroup(true);

      if (editingGroup) {
        await AccountGroupService.update(editingGroup._id, payload);
      } else {
        await AccountGroupService.create(payload);
      }

      setEditingGroup(null);

      await loadGroups();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save account group."
      );
    } finally {
      setSavingGroup(false);
    }
  };

  const handleDeleteGroup = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account group?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await AccountGroupService.delete(id);

      await loadGroups();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to delete account group."
      );
    }
  };

  const handleSaveLedger = async data => {
    const payload = { ...data, company: companyId };

    try {
      setSavingLedger(true);

      if (editingLedger) {
        await AccountLedgerService.update(editingLedger._id, payload);
      } else {
        await AccountLedgerService.create(payload);
      }

      setEditingLedger(null);

      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save account ledger."
      );
    } finally {
      setSavingLedger(false);
    }
  };

  const handleDeleteLedger = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account ledger?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await AccountLedgerService.delete(id);

      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to delete account ledger."
      );
    }
  };

  const handleSaveReceipt = async data => {
    const payload = {
      ...data,
      company: companyId,
      receiptDate: new Date(
        data.receiptDate || todayDate()
      ).toISOString()
    };

    try {
      setSavingReceipt(true);

      await ReceiptService.create(payload);

      await loadReceipts();
      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save receipt."
      );
    } finally {
      setSavingReceipt(false);
    }
  };

  const handleSavePayment = async data => {
    const payload = {
      ...data,
      company: companyId,
      paymentDate: new Date(
        data.paymentDate || todayDate()
      ).toISOString()
    };

    try {
      setSavingPayment(true);

      await PaymentService.create(payload);

      await loadPayments();
      await loadLedgers();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save payment."
      );
    } finally {
      setSavingPayment(false);
    }
  };

  if (companyLoading || loading) {
    return <p>Loading...</p>;
  }

  if (companyError) {
    return <p>{companyError}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Accounts</h1>

      <div className="tabs">
        <button
          type="button"
          className={
            tab === "setup"
              ? "tab-button active"
              : "tab-button"
          }
          onClick={() => setTab("setup")}
        >
          Groups &amp; Ledgers
        </button>

        <button
          type="button"
          className={
            tab === "receipts"
              ? "tab-button active"
              : "tab-button"
          }
          onClick={() => setTab("receipts")}
        >
          Receipts
        </button>

        <button
          type="button"
          className={
            tab === "payments"
              ? "tab-button active"
              : "tab-button"
          }
          onClick={() => setTab("payments")}
        >
          Payments
        </button>
      </div>

      {tab === "setup" && (
        <>
          <h2>Account Groups</h2>

          <AccountGroupForm
            key={editingGroup?._id || "new-group"}
            loading={savingGroup}
            initialValues={
              editingGroup
                ? {
                    code: editingGroup.code,
                    name: editingGroup.name,
                    nature: editingGroup.nature,
                    description: editingGroup.description || ""
                  }
                : undefined
            }
            onSubmit={handleSaveGroup}
          />

          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Nature</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {groups.map(group => (
                <tr key={group._id}>
                  <td>{group.code}</td>
                  <td>{group.name}</td>
                  <td>{group.nature}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setEditingGroup(group)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteGroup(group._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Account Ledgers</h2>

          {groups.length === 0 ? (
            <p>
              Create at least one Account Group above before adding
              ledgers.
            </p>
          ) : (
            <>
              <AccountLedgerForm
                key={editingLedger?._id || "new-ledger"}
                groups={groups}
                loading={savingLedger}
                initialValues={
                  editingLedger
                    ? {
                        code: editingLedger.code,
                        name: editingLedger.name,
                        accountGroup:
                          editingLedger.accountGroup?._id ||
                          editingLedger.accountGroup,
                        openingBalance: String(
                          editingLedger.openingBalance ?? 0
                        ),
                        openingBalanceType:
                          editingLedger.openingBalanceType,
                        phone: editingLedger.phone || "",
                        email: editingLedger.email || ""
                      }
                    : undefined
                }
                onSubmit={handleSaveLedger}
              />

              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Group</th>
                    <th>Balance</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {ledgers.map(ledger => (
                    <tr key={ledger._id}>
                      <td>{ledger.code}</td>
                      <td>{ledger.name}</td>
                      <td>{ledger.accountGroup?.name}</td>
                      <td>
                        {ledger.currentBalance} {ledger.balanceType}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setEditingLedger(ledger)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteLedger(ledger._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}

      {tab === "receipts" && (
        <>
          <h2>Record a Receipt</h2>

          {customers.length === 0 || ledgers.length === 0 ? (
            <p>
              Create at least one Customer and Account Ledger before
              recording receipts.
            </p>
          ) : (
            <ReceiptForm
              key={receipts.length}
              customers={customers}
              salesInvoices={salesInvoices}
              ledgers={ledgers}
              loading={savingReceipt}
              initialValues={{
                customer: customers[0]._id,
                salesInvoice: "",
                accountLedger: ledgers[0]._id,
                receiptNumber: generateNumber(
                  "RCT",
                  receipts.length
                ),
                receiptDate: todayDate(),
                receiptMethod: "CASH",
                referenceNumber: "",
                amount: "0",
                remarks: ""
              }}
              onSubmit={handleSaveReceipt}
            />
          )}

          <h2>Recent Receipts</h2>

          <table>
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {receipts.map(receipt => (
                <tr key={receipt._id}>
                  <td>{receipt.receiptNumber}</td>
                  <td>{receipt.customer?.name}</td>
                  <td>
                    {new Date(receipt.receiptDate).toLocaleDateString()}
                  </td>
                  <td>{receipt.receiptMethod}</td>
                  <td>{receipt.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "payments" && (
        <>
          <h2>Record a Payment</h2>

          {suppliers.length === 0 || ledgers.length === 0 ? (
            <p>
              Create at least one Supplier and Account Ledger before
              recording payments.
            </p>
          ) : (
            <PaymentForm
              key={payments.length}
              suppliers={suppliers}
              purchaseInvoices={purchaseInvoices}
              ledgers={ledgers}
              loading={savingPayment}
              initialValues={{
                supplier: suppliers[0]._id,
                purchaseInvoice: "",
                accountLedger: ledgers[0]._id,
                paymentNumber: generateNumber(
                  "PMT",
                  payments.length
                ),
                paymentDate: todayDate(),
                paymentMethod: "CASH",
                referenceNumber: "",
                amount: "0",
                remarks: ""
              }}
              onSubmit={handleSavePayment}
            />
          )}

          <h2>Recent Payments</h2>

          <table>
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Method</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>
                  <td>{payment.paymentNumber}</td>
                  <td>{payment.supplier?.name}</td>
                  <td>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
