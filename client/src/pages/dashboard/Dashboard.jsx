// client/src/pages/dashboard/Dashboard.jsx

import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboard.service";

export default function Dashboard() {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const response =
        await getDashboardStats();

      setStats(response.data);
    } catch (err) {
      setError(
        "Unable to load dashboard stats."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-card-label">
            Companies
          </p>
          <p className="stat-card-value">
            {stats.companies.total}
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">
            Customers
          </p>
          <p className="stat-card-value">
            {stats.customers.total}
          </p>
          <p className="stat-card-sub">
            {stats.customers.active} active
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">
            Suppliers
          </p>
          <p className="stat-card-value">
            {stats.suppliers.total}
          </p>
          <p className="stat-card-sub">
            {stats.suppliers.active} active
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">
            Items
          </p>
          <p className="stat-card-value">
            {stats.items.total}
          </p>
          <p className="stat-card-sub">
            {stats.items.active} active
          </p>
        </div>
      </div>
    </div>
  );
}
