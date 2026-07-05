// client/src/pages/masters/Item.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import ItemService from "../../services/item.service";
import ItemCategoryService from "../../services/itemCategory.service";
import UnitOfMeasureService from "../../services/unitOfMeasure.service";
import ItemForm from "../../components/masters/ItemForm";

export default function Item() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [items, setItems] = useState([]);
  const [categories, setCategories] =
    useState([]);
  const [units, setUnits] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingItem, setEditingItem] =
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
        categoryResponse,
        unitResponse,
        itemResponse
      ] = await Promise.all([
        ItemCategoryService.getAll({ company }),
        UnitOfMeasureService.getAll({ company }),
        ItemService.getAll({ company })
      ]);

      setCategories(
        categoryResponse.data || []
      );
      setUnits(unitResponse.data || []);
      setItems(itemResponse.data || []);
    } catch (err) {
      setError(
        "Unable to load items."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadItems = async () => {
    const response = await ItemService.getAll({
      company: companyId
    });

    setItems(response.data || []);
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingItem) {
        await ItemService.update(
          editingItem._id,
          payload
        );
      } else {
        await ItemService.create(payload);
      }

      setEditingItem(null);

      await loadItems();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save item."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await ItemService.delete(id);

      await loadItems();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete item."
      );
    }
  };

  const handleEdit = item => {
    setEditingItem(item);
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

  if (categories.length === 0 || units.length === 0) {
    return (
      <div className="page">
        <h1>Items</h1>

        <p>
          Create at least one Item Category
          and Unit of Measure before adding items.
        </p>

        <p>
          <Link to="/app/masters/item-categories">
            Go to Item Categories
          </Link>
          {" · "}
          <Link to="/app/masters/units">
            Go to Units of Measure
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Items</h1>

      <ItemForm
        key={editingItem?._id || "new"}
        categories={categories}
        units={units}
        loading={saving}
        initialValues={
          editingItem
            ? {
                code: editingItem.code,
                sku: editingItem.sku,
                name: editingItem.name,
                category:
                  editingItem.category?._id ||
                  editingItem.category,
                unit:
                  editingItem.unit?._id ||
                  editingItem.unit,
                barcode:
                  editingItem.barcode || "",
                hsnCode:
                  editingItem.hsnCode || "",
                purchasePrice: String(
                  editingItem.purchasePrice ?? 0
                ),
                sellingPrice: String(
                  editingItem.sellingPrice ?? 0
                ),
                minimumStock: String(
                  editingItem.minimumStock ?? 0
                )
              }
            : undefined
        }
        onSubmit={handleSave}
      />

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Barcode</th>
            <th>Selling Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.category?.name}</td>
              <td>{item.unit?.symbol}</td>
              <td>{item.barcode}</td>
              <td>{item.sellingPrice}</td>
              <td>
                {item.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(item)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item._id)
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
