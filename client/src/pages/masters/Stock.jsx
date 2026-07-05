// client/src/pages/masters/Stock.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import StockService from "../../services/stock.service";
import ItemService from "../../services/item.service";
import WarehouseService from "../../services/warehouse.service";
import StockForm from "../../components/masters/StockForm";

export default function Stock() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [stocks, setStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingStock, setEditingStock] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [
        itemResponse,
        warehouseResponse,
        stockResponse
      ] = await Promise.all([
        ItemService.getAll({ company }),
        WarehouseService.getAll({ company }),
        StockService.getAll({ company })
      ]);

      setItems(itemResponse.data || []);
      setWarehouses(
        warehouseResponse.data || []
      );
      setStocks(stockResponse.data || []);
    } catch (err) {
      setError(
        "Unable to load stock."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadStocks = async () => {
    const response = await StockService.getAll({
      company: companyId
    });

    setStocks(response.data || []);
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingStock) {
        await StockService.update(
          editingStock._id,
          { quantity: payload.quantity }
        );
      } else {
        await StockService.create(payload);
      }

      setEditingStock(null);

      await loadStocks();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save stock."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stock record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await StockService.delete(id);

      await loadStocks();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete stock record."
      );
    }
  };

  const handleEdit = stock => {
    setEditingStock(stock);
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

  if (items.length === 0 || warehouses.length === 0) {
    return (
      <div className="page">
        <h1>Stock</h1>

        <p>
          Create at least one Item and
          Warehouse before setting stock.
        </p>

        <p>
          <Link to="/app/masters/items">
            Go to Items
          </Link>
          {" · "}
          <Link to="/app/masters/warehouses">
            Go to Warehouses
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Stock</h1>

      <StockForm
        key={editingStock?._id || "new"}
        items={items}
        warehouses={warehouses}
        editing={Boolean(editingStock)}
        loading={saving}
        initialValues={
          editingStock
            ? {
                item:
                  editingStock.item?._id ||
                  editingStock.item,
                warehouse:
                  editingStock.warehouse?._id ||
                  editingStock.warehouse,
                quantity: String(
                  editingStock.quantity ?? 0
                )
              }
            : undefined
        }
        onSubmit={handleSave}
      />

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map(stock => (
            <tr key={stock._id}>
              <td>{stock.item?.name}</td>
              <td>{stock.warehouse?.name}</td>
              <td>{stock.quantity}</td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(stock)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(stock._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
