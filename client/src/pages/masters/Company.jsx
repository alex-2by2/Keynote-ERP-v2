// client/src/pages/masters/Company.jsx

import { useEffect, useState } from "react";

import CompanyService from "../../services/company.service";

export default function Company() {
  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

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

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(company => (
            <tr key={company._id}>
              <td>{company.code}</td>
              <td>{company.name}</td>
              <td>
                {company.isActive
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
