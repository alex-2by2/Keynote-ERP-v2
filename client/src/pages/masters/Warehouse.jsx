// client/src/pages/masters/Warehouse.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import WarehouseService from "../../services/warehouse.service";
import BranchService from "../../services/branch.service";
import WarehouseForm from "../../components/masters/WarehouseForm";

export default function Warehouse() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [warehouses, setWarehouses] =
    useState([]);
  const [branches, setBranches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingWarehouse, setEditingWarehouse] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      init(companyId);
    }
  }, [companyId]);

  const init = async company => {
    try {
      setLoading(true);

      const [branchResponse, warehouseResponse] =
        await Promise.all([
          BranchService.getAll(),
          WarehouseService.getAll({ company })
        ]);

      setBranches(branchResponse.data || []);
      setWarehouses(
        warehouseResponse.data || []
      );
    } catch (err) {
      setError(
        "Unable to load warehouses."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadWarehouses = async () => {
    const response =
      await WarehouseService.getAll({
        company: companyId
      });

    setWarehouses(response.data || []);
  };

  const handleSave = async data => {
    const payload = {
      ...data,
      company: companyId
    };

    try {
      setSaving(true);

      if (editingWarehouse) {
        await WarehouseService.update(
          editingWarehouse._id,
          payload
        );
      } else {
        await WarehouseService.create(payload);
      }

      setEditingWarehouse(null);

      await loadWarehouses();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save warehouse."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this warehouse?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await WarehouseService.delete(id);

      await loadWarehouses();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete warehouse."
      );
    }
  };

  const handleEdit = warehouse => {
    setEditingWarehouse(warehouse);
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

  if (branches.length === 0) {
    return (
      <div className="page">
        <h1>Warehouses</h1>

        <p>
          Create at least one Branch before
          adding warehouses.
        </p>

        <p>
          <Link to="/app/masters/branches">
            Go to Branches
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Warehouses</h1>

      <WarehouseForm
        key={editingWarehouse?._id || "new"}
        branches={branches}
        loading={saving}
        initialValues={
          editingWarehouse
            ? {
                code: editingWarehouse.code,
                name: editingWarehouse.name,
                address:
                  editingWarehouse.address || "",
                branch:
                  editingWarehouse.branch?._id ||
                  editingWarehouse.branch
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
            <th>Branch</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {warehouses.map(warehouse => (
            <tr key={warehouse._id}>
              <td>{warehouse.code}</td>
              <td>{warehouse.name}</td>
              <td>{warehouse.branch?.name}</td>
              <td>
                {warehouse.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(warehouse)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(warehouse._id)
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
