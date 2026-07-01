// client/src/pages/masters/Customer.jsx

import { useEffect, useState } from "react";

import CustomerService from "../../services/customer.service";

export default function Customer() {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const response =
        await CustomerService.getAll();

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page">
      <h1>Customers</h1>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.code}</td>
              <td>{customer.name}</td>
              <td>{customer.mobile}</td>
              <td>
                {customer.isActive
                  ? "Active"
                  : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
