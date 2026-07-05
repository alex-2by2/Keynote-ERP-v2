// client/src/pages/masters/Supplier.jsx

import { useEffect, useState } from "react";

import SupplierService from "../../services/supplier.service";
import CompanyService from "../../services/company.service";
import SupplierForm from "../../components/masters/SupplierForm";

export default function Supplier() {
  const [suppliers, setSuppliers] =
    useState([]);

  const [companyId, setCompanyId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [editingSupplier, setEditingSupplier] =
    useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);

      const companyResponse =
        await CompanyService.getAll();

      const firstCompany =
        (companyResponse.data || [])[0];

      if (!firstCompany) {
        setError(
          "Create a company first, under Companies."
        );

        return;
      }

      setCompanyId(firstCompany._id);

      await loadSuppliers(firstCompany._id);
    } catch (err) {
      setError(
        "Unable to load suppliers."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSuppliers = async company => {
    const response =
      await SupplierService.getAll({ company });

    setSuppliers(response.data || []);
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingSupplier) {
        await SupplierService.update(
          editingSupplier._id,
          payload
        );
      } else {
        await SupplierService.create(payload);
      }

      setEditingSupplier(null);

      await loadSuppliers(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save supplier."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await SupplierService.delete(id);

      await loadSuppliers(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete supplier."
      );
    }
  };

  const handleEdit = supplier => {
    setEditingSupplier(supplier);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Suppliers</h1>

      <SupplierForm
        key={editingSupplier?._id || "new"}
        loading={saving}
        initialValues={
          editingSupplier
            ? {
                code: editingSupplier.code,
                name: editingSupplier.name,
                contactPerson:
                  editingSupplier.contactPerson || "",
                email: editingSupplier.email || "",
                phone: editingSupplier.phone || "",
                taxNumber:
                  editingSupplier.taxNumber || ""
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
            <th>Contact</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier._id}>
              <td>{supplier.code}</td>
              <td>{supplier.name}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.phone}</td>
              <td>
                {supplier.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(supplier)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(supplier._id)
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
