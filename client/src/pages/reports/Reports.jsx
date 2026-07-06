// client/src/pages/reports/Reports.jsx

import { useEffect, useState } from "react";

import { useDefaultCompany } from "../../hooks/useDefaultCompany";
import StockService from "../../services/stock.service";
import SalesInvoiceService from "../../services/salesInvoice.service";

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth()
  );
}

export default function Reports() {
  const {
    companyId,
    loading: companyLoading,
    error: companyError
  } = useDefaultCompany();

  const [lowStock, setLowStock] =
    useState([]);
  const [todayTotal, setTodayTotal] =
    useState(0);
  const [monthTotal, setMonthTotal] =
    useState(0);

  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (companyId) {
      load(companyId);
    }
  }, [companyId]);

  const load = async company => {
    try {
      setLoading(true);

      const [stockResponse, invoiceResponse] =
        await Promise.all([
          StockService.getAll({ company }),
          SalesInvoiceService.getAll({
            company
          })
        ]);

      const stocks = stockResponse.data || [];
      const invoices =
        invoiceResponse.data || [];

      const low = stocks.filter(stock => {
        const reorderLevel =
          stock.item?.minimumStock || 0;

        return (
          reorderLevel > 0 &&
          stock.quantity <= reorderLevel
        );
      });

      setLowStock(low);

      const now = new Date();

      let today = 0;
      let month = 0;

      invoices.forEach(invoice => {
        const invoiceDate = new Date(
          invoice.invoiceDate
        );

        if (isSameDay(invoiceDate, now)) {
          today += invoice.grandTotal;
        }

        if (isSameMonth(invoiceDate, now)) {
          month += invoice.grandTotal;
        }
      });

      setTodayTotal(today);
      setMonthTotal(month);
    } catch (err) {
      setError(
        "Unable to load reports."
      );
    } finally {
      setLoading(false);
    }
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
      <h1>Reports</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-card-label">
            Sales Today
          </p>
          <p className="stat-card-value">
            {todayTotal.toFixed(2)}
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">
            Sales This Month
          </p>
          <p className="stat-card-value">
            {monthTotal.toFixed(2)}
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">
            Low Stock Items
          </p>
          <p className="stat-card-value">
            {lowStock.length}
          </p>
        </div>
      </div>

      <h2>Low Stock</h2>

      {lowStock.length === 0 ? (
        <p>
          Nothing is below its reorder level
          right now.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Warehouse</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
            </tr>
          </thead>

          <tbody>
            {lowStock.map(stock => (
              <tr key={stock._id}>
                <td>{stock.item?.name}</td>
                <td>
                  {stock.warehouse?.name}
                </td>
                <td>{stock.quantity}</td>
                <td>
                  {stock.item?.minimumStock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
