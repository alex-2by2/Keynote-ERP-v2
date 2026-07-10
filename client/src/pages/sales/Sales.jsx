// client/src/pages/sales/Sales.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import CustomerService from "../../services/customer.service";
import WarehouseService from "../../services/warehouse.service";
import ItemService from "../../services/item.service";
import SalesInvoiceService from "../../services/salesInvoice.service";
import SalesReturnService from "../../services/salesReturn.service";
import SalesReturnForm from "../../components/sales/SalesReturnForm";

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

export default function Sales() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [tab, setTab] = useState("billing");

  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [returns, setReturns] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [savingReturn, setSavingReturn] = useState(false);

  const [customer, setCustomer] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(todayDate());
  const [lines, setLines] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [lastReceipt, setLastReceipt] = useState(null);

  const barcodeInputRef = useRef(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  useEffect(() => {
    if (tab === "billing" && barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, [tab, loading]);

  const init = async company => {
    try {
      setLoading(true);

      const [
        customerResponse,
        warehouseResponse,
        itemResponse,
        invoiceResponse,
        returnResponse
      ] = await Promise.all([
        CustomerService.getAll({ company }),
        WarehouseService.getAll({ company }),
        ItemService.getAll({ company }),
        SalesInvoiceService.getAll({ company }),
        SalesReturnService.getAll({ company })
      ]);

      const loadedCustomers = customerResponse.data || [];
      const loadedWarehouses = warehouseResponse.data || [];
      const loadedItems = itemResponse.data || [];
      const loadedInvoices = invoiceResponse.data || [];
      const loadedReturns = returnResponse.data || [];

      setCustomers(loadedCustomers);
      setWarehouses(loadedWarehouses);
      setItems(loadedItems);
      setInvoices(loadedInvoices);
      setReturns(loadedReturns);

      setCustomer(loadedCustomers[0]?._id || "");
      setWarehouse(loadedWarehouses[0]?._id || "");
      setInvoiceNumber(
        generateNumber("INV", loadedInvoices.length)
      );
    } catch (err) {
      setError("Unable to load the sales screen.");
    } finally {
      setLoading(false);
    }
  };

  const reloadInvoices = async () => {
    const response = await SalesInvoiceService.getAll({
      company: companyId
    });

    const loaded = response.data || [];

    setInvoices(loaded);

    return loaded;
  };

  const reloadReturns = async () => {
    const response = await SalesReturnService.getAll({
      company: companyId
    });

    setReturns(response.data || []);
  };

  const handleBarcodeScan = event => {
    event.preventDefault();

    const code = barcodeInput.trim();

    if (!code) {
      return;
    }

    const matched = items.find(
      item => item.barcode === code
    );

    if (!matched) {
      setError(
        `No item found with barcode "${code}".`
      );
      setBarcodeInput("");

      return;
    }

    setError("");

    const existingIndex = lines.findIndex(
      line => line.item === matched._id
    );

    if (existingIndex >= 0) {
      const next = [...lines];

      next[existingIndex] = {
        ...next[existingIndex],
        quantity: String(
          Number(next[existingIndex].quantity) + 1
        )
      };

      setLines(next);
    } else {
      setLines([
        ...lines,
        {
          item: matched._id,
          quantity: "1",
          unitPrice: String(matched.sellingPrice ?? 0)
        }
      ]);
    }

    setBarcodeInput("");
  };

  const updateLine = (index, field, value) => {
    const next = [...lines];

    next[index] = { ...next[index], [field]: value };

    if (field === "item") {
      const selected = items.find(item => item._id === value);

      next[index].unitPrice = String(selected?.sellingPrice ?? 0);
    }

    setLines(next);
  };

  const addLine = () => {
    setLines([
      ...lines,
      {
        item: items[0]?._id || "",
        quantity: "1",
        unitPrice: String(items[0]?.sellingPrice ?? 0)
      }
    ]);
  };

  const removeLine = index => {
    if (lines.length === 1) {
      return;
    }

    setLines(lines.filter((_, i) => i !== index));
  };

  const grandTotal = lines.reduce((sum, line) => {
    const qty = Number(line.quantity) || 0;
    const price = Number(line.unitPrice) || 0;

    return sum + qty * price;
  }, 0);

  const handleSubmit = async event => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!customer) {
      return setError("Select a customer.");
    }

    if (!warehouse) {
      return setError("Select a warehouse.");
    }

    if (lines.length === 0) {
      return setError("Scan or add at least one item.");
    }

    if (lines.some(line => !line.item || Number(line.quantity) <= 0)) {
      return setError(
        "Every line needs an item and a quantity greater than zero."
      );
    }

    const payload = {
      company: companyId,
      customer,
      warehouse,
      invoiceNumber,
      invoiceDate: new Date(invoiceDate).toISOString(),
      status: "POSTED",
      items: lines.map(line => ({
        item: line.item,
        quantity: Number(line.quantity),
        unitPrice: Number(line.unitPrice)
      }))
    };

    try {
      setSaving(true);

      const response = await SalesInvoiceService.create(payload);
      const created = response.data;

      const loadedInvoices = await reloadInvoices();

      setLastReceipt({
        invoiceNumber,
        invoiceDate,
        customerName:
          customers.find(c => c._id === customer)?.name || "",
        lines: lines.map(line => {
          const item = items.find(i => i._id === line.item);

          return {
            name: item?.name || "",
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            lineTotal: (
              Number(line.quantity) * Number(line.unitPrice)
            ).toFixed(2)
          };
        }),
        grandTotal: created.grandTotal
      });

      setSuccess(
        `Sale completed — ${invoiceNumber}, total ${created.grandTotal}.`
      );

      setLines([]);

      setInvoiceNumber(generateNumber("INV", loadedInvoices.length));
      setInvoiceDate(todayDate());
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to complete sale."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReturn = async data => {
    const payload = {
      ...data,
      company: companyId,
      returnDate: new Date(
        data.returnDate || todayDate()
      ).toISOString()
    };

    try {
      setSavingReturn(true);
      setError("");
      setSuccess("");

      await SalesReturnService.create(payload);

      await reloadReturns();

      setSuccess("Return recorded. Stock updated.");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save return."
      );
    } finally {
      setSavingReturn(false);
    }
  };

  if (companyLoading || loading) {
    return <p>Loading...</p>;
  }

  if (companyError) {
    return <p>{companyError}</p>;
  }

  if (customers.length === 0 || warehouses.length === 0 || items.length === 0) {
    return (
      <div className="page">
        <h1>Sales</h1>

        <p>
          Create at least one Customer, Warehouse, and Item before billing.
        </p>

        <p>
          <Link to="/app/masters/customers">Go to Customers</Link>
          {" · "}
          <Link to="/app/masters/warehouses">Go to Warehouses</Link>
          {" · "}
          <Link to="/app/masters/items">Go to Items</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Sales</h1>

      <div className="tabs">
        <button
          type="button"
          className={tab === "billing" ? "tab-button active" : "tab-button"}
          onClick={() => setTab("billing")}
        >
          Billing
        </button>

        <button
          type="button"
          className={tab === "returns" ? "tab-button active" : "tab-button"}
          onClick={() => setTab("returns")}
        >
          Returns
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {lastReceipt && (
        <div className="receipt-print">
          <h2>Keynote ERP</h2>

          <p>Invoice: {lastReceipt.invoiceNumber}</p>
          <p>Date: {lastReceipt.invoiceDate}</p>
          <p>Customer: {lastReceipt.customerName}</p>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {lastReceipt.lines.map((line, index) => (
                <tr key={index}>
                  <td>{line.name}</td>
                  <td>{line.quantity}</td>
                  <td>{line.unitPrice}</td>
                  <td>{line.lineTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="billing-total">
            Total: {lastReceipt.grandTotal}
          </div>

          <div className="no-print">
            <button type="button" onClick={() => window.print()}>
              Print Receipt
            </button>

            <button
              type="button"
              onClick={() => setLastReceipt(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {tab === "billing" && (
        <>
          <form onSubmit={handleBarcodeScan}>
            <div>
              <label>Scan or Type Barcode</label>

              <input
                ref={barcodeInputRef}
                type="text"
                value={barcodeInput}
                onChange={event =>
                  setBarcodeInput(event.target.value)
                }
                placeholder="Scan here — item adds automatically"
                autoComplete="off"
              />
            </div>
          </form>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Customer</label>

              <select
                value={customer}
                onChange={event => setCustomer(event.target.value)}
              >
                {customers.map(item => (
                  <option key={item._id} value={item._id}>
                    {item.code} - {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Warehouse</label>

              <select
                value={warehouse}
                onChange={event => setWarehouse(event.target.value)}
              >
                {warehouses.map(item => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Invoice Number</label>

              <input
                type="text"
                value={invoiceNumber}
                onChange={event => setInvoiceNumber(event.target.value)}
              />
            </div>

            <div>
              <label>Invoice Date</label>

              <input
                type="date"
                value={invoiceDate}
                onChange={event => setInvoiceDate(event.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {lines.map((line, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        value={line.item}
                        onChange={event =>
                          updateLine(index, "item", event.target.value)
                        }
                      >
                        {items.map(item => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0.01"
                        step="any"
                        value={line.quantity}
                        onChange={event =>
                          updateLine(index, "quantity", event.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.unitPrice}
                        onChange={event =>
                          updateLine(index, "unitPrice", event.target.value)
                        }
                      />
                    </td>

                    <td>
                      {(Number(line.quantity) * Number(line.unitPrice)).toFixed(2)}
                    </td>

                    <td>
                      <button type="button" onClick={() => removeLine(index)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="button" onClick={addLine}>
              + Add Item
            </button>

            <div className="billing-total">
              Grand Total: {grandTotal.toFixed(2)}
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Complete Sale"}
            </button>
          </form>

          <h2>Recent Invoices</h2>

          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.customer?.name}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td>{invoice.grandTotal}</td>
                  <td>{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === "returns" && (
        <>
          <h2>Record a Return</h2>

          <SalesReturnForm
            key={returns.length}
            customers={customers}
            warehouses={warehouses}
            items={items}
            loading={savingReturn}
            initialValues={{
              customer: customers[0]._id,
              warehouse: warehouses[0]._id,
              returnNumber: generateNumber("SRT", returns.length),
              returnDate: todayDate(),
              item: items[0]._id,
              quantity: "1",
              unitPrice: String(items[0].sellingPrice ?? 0),
              reason: ""
            }}
            onSubmit={handleSaveReturn}
          />

          <h2>Recent Returns</h2>

          <table>
            <thead>
              <tr>
                <th>Return #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {returns.map(salesReturn => (
                <tr key={salesReturn._id}>
                  <td>{salesReturn.returnNumber}</td>
                  <td>{salesReturn.customer?.name}</td>
                  <td>
                    {new Date(salesReturn.returnDate).toLocaleDateString()}
                  </td>
                  <td>{salesReturn.totalAmount}</td>
                  <td>{salesReturn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
