// client/src/pages/sales/Sales.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import CustomerService from "../../services/customer.service";
import WarehouseService from "../../services/warehouse.service";
import ItemService from "../../services/item.service";
import SalesInvoiceService from "../../services/salesInvoice.service";

function todayDate() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function generateInvoiceNumber(existingCount) {
  const stamp = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const sequence = String(
    existingCount + 1
  ).padStart(4, "0");

  return `INV${stamp}${sequence}`;
}

export default function Sales() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [customers, setCustomers] =
    useState([]);
  const [warehouses, setWarehouses] =
    useState([]);
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] =
    useState("");
  const [saving, setSaving] =
    useState(false);

  const [customer, setCustomer] =
    useState("");
  const [warehouse, setWarehouse] =
    useState("");
  const [invoiceNumber, setInvoiceNumber] =
    useState("");
  const [invoiceDate, setInvoiceDate] =
    useState(todayDate());
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [
        customerResponse,
        warehouseResponse,
        itemResponse,
        invoiceResponse
      ] = await Promise.all([
        CustomerService.getAll({ company }),
        WarehouseService.getAll({ company }),
        ItemService.getAll({ company }),
        SalesInvoiceService.getAll({ company })
      ]);

      const loadedCustomers =
        customerResponse.data || [];
      const loadedWarehouses =
        warehouseResponse.data || [];
      const loadedItems =
        itemResponse.data || [];
      const loadedInvoices =
        invoiceResponse.data || [];

      setCustomers(loadedCustomers);
      setWarehouses(loadedWarehouses);
      setItems(loadedItems);
      setInvoices(loadedInvoices);

      setCustomer(
        loadedCustomers[0]?._id || ""
      );
      setWarehouse(
        loadedWarehouses[0]?._id || ""
      );
      setInvoiceNumber(
        generateInvoiceNumber(
          loadedInvoices.length
        )
      );

      if (loadedItems.length > 0) {
        setLines([
          {
            item: loadedItems[0]._id,
            quantity: "1",
            unitPrice: String(
              loadedItems[0].sellingPrice ?? 0
            )
          }
        ]);
      }
    } catch (err) {
      setError(
        "Unable to load the billing screen."
      );
    } finally {
      setLoading(false);
    }
  };

  const reloadInvoices = async () => {
    const response =
      await SalesInvoiceService.getAll({
        company: companyId
      });

    const loaded = response.data || [];

    setInvoices(loaded);

    return loaded;
  };

  const updateLine = (index, field, value) => {
    const next = [...lines];

    next[index] = {
      ...next[index],
      [field]: value
    };

    if (field === "item") {
      const selected = items.find(
        item => item._id === value
      );

      next[index].unitPrice = String(
        selected?.sellingPrice ?? 0
      );
    }

    setLines(next);
  };

  const addLine = () => {
    setLines([
      ...lines,
      {
        item: items[0]?._id || "",
        quantity: "1",
        unitPrice: String(
          items[0]?.sellingPrice ?? 0
        )
      }
    ]);
  };

  const removeLine = index => {
    if (lines.length === 1) {
      return;
    }

    setLines(
      lines.filter((_, i) => i !== index)
    );
  };

  const grandTotal = lines.reduce(
    (sum, line) => {
      const qty = Number(line.quantity) || 0;
      const price =
        Number(line.unitPrice) || 0;

      return sum + qty * price;
    },
    0
  );

  const handleSubmit = async event => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!customer) {
      return setError(
        "Select a customer."
      );
    }

    if (!warehouse) {
      return setError(
        "Select a warehouse."
      );
    }

    if (
      lines.some(
        line =>
          !line.item ||
          Number(line.quantity) <= 0
      )
    ) {
      return setError(
        "Every line needs an item and a quantity greater than zero."
      );
    }

    const payload = {
      company: companyId,
      customer,
      warehouse,
      invoiceNumber,
      invoiceDate: new Date(
        invoiceDate
      ).toISOString(),
      status: "POSTED",
      items: lines.map(line => ({
        item: line.item,
        quantity: Number(line.quantity),
        unitPrice: Number(line.unitPrice)
      }))
    };

    try {
      setSaving(true);

      const response =
        await SalesInvoiceService.create(
          payload
        );

      const created = response.data;

      const loadedInvoices =
        await reloadInvoices();

      setSuccess(
        `Sale completed — ${invoiceNumber}, total ${created.grandTotal}.`
      );

      setLines(
        items.length > 0
          ? [
              {
                item: items[0]._id,
                quantity: "1",
                unitPrice: String(
                  items[0].sellingPrice ?? 0
                )
              }
            ]
          : []
      );

      setInvoiceNumber(
        generateInvoiceNumber(
          loadedInvoices.length
        )
      );
      setInvoiceDate(todayDate());
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to complete sale."
      );
    } finally {
      setSaving(false);
    }
  };

  if (companyLoading || loading) {
    return <p>Loading...</p>;
  }

  if (companyError) {
    return <p>{companyError}</p>;
  }

  if (
    customers.length === 0 ||
    warehouses.length === 0 ||
    items.length === 0
  ) {
    return (
      <div className="page">
        <h1>Sales</h1>

        <p>
          Create at least one Customer,
          Warehouse, and Item before billing.
        </p>

        <p>
          <Link to="/app/masters/customers">
            Go to Customers
          </Link>
          {" · "}
          <Link to="/app/masters/warehouses">
            Go to Warehouses
          </Link>
          {" · "}
          <Link to="/app/masters/items">
            Go to Items
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Sales</h1>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer</label>

          <select
            value={customer}
            onChange={event =>
              setCustomer(event.target.value)
            }
          >
            {customers.map(item => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.code} - {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Warehouse</label>

          <select
            value={warehouse}
            onChange={event =>
              setWarehouse(event.target.value)
            }
          >
            {warehouses.map(item => (
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
          <label>Invoice Number</label>

          <input
            type="text"
            value={invoiceNumber}
            onChange={event =>
              setInvoiceNumber(
                event.target.value
              )
            }
          />
        </div>

        <div>
          <label>Invoice Date</label>

          <input
            type="date"
            value={invoiceDate}
            onChange={event =>
              setInvoiceDate(
                event.target.value
              )
            }
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
                      updateLine(
                        index,
                        "item",
                        event.target.value
                      )
                    }
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
                </td>

                <td>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    value={line.quantity}
                    onChange={event =>
                      updateLine(
                        index,
                        "quantity",
                        event.target.value
                      )
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
                      updateLine(
                        index,
                        "unitPrice",
                        event.target.value
                      )
                    }
                  />
                </td>

                <td>
                  {(
                    Number(line.quantity) *
                    Number(line.unitPrice)
                  ).toFixed(2)}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      removeLine(index)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={addLine}
        >
          + Add Item
        </button>

        <div className="billing-total">
          Grand Total: {grandTotal.toFixed(2)}
        </div>

        <button
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Complete Sale"}
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
              <td>
                {new Date(
                  invoice.invoiceDate
                ).toLocaleDateString()}
              </td>
              <td>{invoice.grandTotal}</td>
              <td>{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
