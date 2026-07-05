// client/src/pages/masters/Customer.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import CustomerService from "../../services/customer.service";
import CustomerForm from "../../components/masters/CustomerForm";

export default function Customer() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  useEffect(() => {
    if (companyId) {
      loadCustomers(companyId);
    }
  }, [companyId]);

  const loadCustomers = async company => {
    try {
      setLoading(true);

      const response =
        await CustomerService.getAll({
          company
        });

      setCustomers(
        response.data || []
      );
    } catch (err) {
      setError(
        "Unable to load customers."
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

      if (editingCustomer) {
        await CustomerService.update(
          editingCustomer._id,
          payload
        );
      } else {
        await CustomerService.create(payload);
      }

      setEditingCustomer(null);

      await loadCustomers(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to save customer."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await CustomerService.delete(id);

      await loadCustomers(companyId);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to delete customer."
      );
    }
  };

  const handleEdit = customer => {
    setEditingCustomer(customer);
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
      <h1>Customers</h1>

      <CustomerForm
        key={editingCustomer?._id || "new"}
        loading={saving}
        initialValues={
          editingCustomer
            ? {
                code: editingCustomer.code,
                name: editingCustomer.name,
                contactPerson:
                  editingCustomer.contactPerson || "",
                email: editingCustomer.email || "",
                phone: editingCustomer.phone || "",
                taxNumber:
                  editingCustomer.taxNumber || ""
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
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.code}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>
                {customer.active
                  ? "Active"
                  : "Inactive"}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(customer)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(customer._id)
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
