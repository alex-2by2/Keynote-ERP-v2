// client/src/pages/masters/Branch.jsx

import { useEffect, useState } from "react";

import BranchService from "../../services/branch.service";
import BranchForm from "../../components/masters/BranchForm";

export default function Branch() {
  const [branches, setBranches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingBranch, setEditingBranch] =
    useState(null);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);

      const response =
        await BranchService.getAll();

      setBranches(response.data || []);
    } catch (err) {
      setError(
        "Unable to load branches."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async data => {
    try {
      setSaving(true);

      if (editingBranch) {
        await BranchService.update(
          editingBranch._id,
          data
        );
      } else {
        await BranchService.create(data);
      }

      setEditingBranch(null);

      await loadBranches();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save branch."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await BranchService.delete(id);

      await loadBranches();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete branch."
      );
    }
  };

  const handleEdit = branch => {
    setEditingBranch(branch);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Branches</h1>

      <BranchForm
        key={editingBranch?._id || "new"}
        loading={saving}
        initialValues={
          editingBranch
            ? {
                code: editingBranch.code,
                name: editingBranch.name,
                email: editingBranch.email || "",
                phone: editingBranch.phone || "",
                city: editingBranch.city || "",
                state: editingBranch.state || ""
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
            <th>City</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {branches.map(branch => (
            <tr key={branch._id}>
              <td>{branch.code}</td>
              <td>{branch.name}</td>
              <td>{branch.city}</td>
              <td>{branch.phone}</td>
              <td>
                {branch.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(branch)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(branch._id)
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
