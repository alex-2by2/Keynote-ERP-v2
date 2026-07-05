// client/src/pages/masters/Company.jsx

import { useEffect, useState } from "react";

import CompanyService from "../../services/company.service";
import CompanyForm from "../../components/masters/CompanyForm";

export default function Company() {
  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");
  const [saving, setSaving] =
  useState(false);
  const [editingCompany, setEditingCompany] =
  useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);
 const handleSave = async data => {
  const payload = {
    code: data.code,
    legalName: data.name,
    displayName: data.name
  };

  try {
    setSaving(true);

    if (editingCompany) {
      await CompanyService.update(
        editingCompany._id,
        payload
      );
    } else {
      await CompanyService.create(payload);
    }

    setEditingCompany(null);

    await loadCompanies();
  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Unable to save company."
    );
  } finally {
    setSaving(false);
  }
};
  const handleDelete = async id => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this company?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await CompanyService.delete(id);

    await loadCompanies();
  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Unable to delete company."
    );
  }
};
const handleEdit = company => {
  setEditingCompany(company);
};
  
  const loadCompanies = async () => {
    try {
      setLoading(true);

      const response =
        await CompanyService.getAll();

      setCompanies(
        response.data || []
      );
    } catch (err) {
      setError(
        "Unable to load companies."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Companies</h1>
<CompanyForm
  key={editingCompany?._id || "new"}
  loading={saving}
  initialValues={
    editingCompany
      ? {
          code: editingCompany.code,
          name: editingCompany.displayName
        }
      : undefined
  }
  onSubmit={handleSave}
/>      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.code}</td>
              <td>{company.displayName}</td>
              <td>
                {company.active
                  ? "Active"
                  : "Inactive"}
              </td>
            <td>
  <button
    type="button"
    onClick={() =>
      handleEdit(company)
    }
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() =>
      handleDelete(company._id)
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
