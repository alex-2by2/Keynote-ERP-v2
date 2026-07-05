// client/src/pages/masters/ItemCategory.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import ItemCategoryService from "../../services/itemCategory.service";
import ItemCategoryForm from "../../components/masters/ItemCategoryForm";

export default function ItemCategory() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      loadCategories(companyId);
    }
  }, [companyId]);

  const loadCategories = async company => {
    try {
      setLoading(true);

      const response =
        await ItemCategoryService.getAll({
          company
        });

      setCategories(response.data || []);
    } catch (err) {
      setError(
        "Unable to load item categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingCategory) {
        await ItemCategoryService.update(
          editingCategory._id,
          payload
        );
      } else {
        await ItemCategoryService.create(
          payload
        );
      }

      setEditingCategory(null);

      await loadCategories(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await ItemCategoryService.delete(id);

      await loadCategories(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete category."
      );
    }
  };

  const handleEdit = category => {
    setEditingCategory(category);
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
      <h1>Item Categories</h1>

      <ItemCategoryForm
        key={editingCategory?._id || "new"}
        loading={saving}
        initialValues={
          editingCategory
            ? {
                code: editingCategory.code,
                name: editingCategory.name,
                description:
                  editingCategory.description || ""
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
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.code}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(category)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(category._id)
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
