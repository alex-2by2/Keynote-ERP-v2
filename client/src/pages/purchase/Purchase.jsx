// client/src/pages/purchase/Purchase.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import SupplierService from "../../services/supplier.service";
import WarehouseService from "../../services/warehouse.service";
import ItemService from "../../services/item.service";
import PurchaseInvoiceService from "../../services/purchaseInvoice.service";

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

  return `PINV${stamp}${sequence}`;
}

export default function Purchase() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [suppliers, setSuppliers] =
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

  const [supplier, setSupplier] =
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
        supplierResponse,
        warehouseResponse,
        itemResponse,
        invoiceResponse
      ] = await Promise.all([
        SupplierService.getAll({ company }),
        WarehouseService.getAll({ company }),
        ItemService.getAll({ company }),
        PurchaseInvoiceService.getAll({
          company
        })
      ]);

      const loadedSuppliers =
        supplierResponse.data || [];
      const loadedWarehouses =
        warehouseResponse.data || [];
      const loadedItems =
        itemResponse.data || [];
      const loadedInvoices =
        invoiceResponse.data || [];

      setSuppliers(loadedSuppliers);
      setWarehouses(loadedWarehouses);
      setItems(loadedItems);
      setInvoices(loadedInvoices);

      setSupplier(
        loadedSuppliers[0]?._id || ""
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
            unitCost: String(
              loadedItems[0].purchasePrice ?? 0
            )
          }
        ]);
      }
    } catch (err) {
      setError(
        "Unable to load the purchase screen."
      );
    } finally {
      setLoading(false);
    }
  };

  const reloadInvoices = async () => {
    const response =
      await PurchaseInvoiceService.getAll({
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

      next[index].unitCost = String(
        selected?.purchasePrice ?? 0
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
        unitCost: String(
          items[0]?.purchasePrice ?? 0
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
      const cost =
        Number(line.unitCost) || 0;

      return sum + qty * cost;
    },
    0
  );

  const handleSubmit = async event => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!supplier) {
      return setError(
        "Select a supplier."
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
      supplier,
      warehouse,
      invoiceNumber,
      invoiceDate: new Date(
        invoiceDate
      ).toISOString(),
      status: "POSTED",
      items: lines.map(line => ({
        item: line.item,
        quantity: Number(line.quantity),
        unitCost: Number(line.unitCost)
      }))
    };

    try {
      setSaving(true);

      const response =
        await PurchaseInvoiceService.create(
          payload
        );

      const created = response.data;

      const loadedInvoices =
        await reloadInvoices();

      setSuccess(
        `Purchase recorded — ${invoiceNumber}, total ${created.grandTotal}. Stock updated.`
      );

      setLines(
        items.length > 0
          ? [
              {
                item: items[0]._id,
                quantity: "1",
                unitCost: String(
                  items[0].purchasePrice ?? 0
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
        "Unable to record purchase."
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
    suppliers.length === 0 ||
    warehouses.length === 0 ||
    items.length === 0
  ) {
    return (
      <div className="page">
        <h1>Purchase</h1>

        <p>
          Create at least one Supplier,
          Warehouse, and Item before
          recording purchases.
        </p>

        <p>
          <Link to="/app/masters/suppliers">
            Go to Suppliers
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
      <h1>Purchase</h1>

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
          <label>Supplier</label>

          <select
            value={supplier}
            onChange={event =>
              setSupplier(event.target.value)
            }
          >
            {suppliers.map(item => (
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
              <th>Cost</th>
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
                    value={line.unitCost}
                    onChange={event =>
                      updateLine(
                        index,
                        "unitCost",
                        event.target.value
                      )
                    }
                  />
                </td>

                <td>
                  {(
                    Number(line.quantity) *
                    Number(line.unitCost)
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
            : "Record Purchase"}
        </button>
      </form>

      <h2>Recent Purchases</h2>

      <table>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Supplier</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.supplier?.name}</td>
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
