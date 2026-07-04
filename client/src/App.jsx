import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Company from "./pages/masters/Company";
import Customer from "./pages/masters/Customer";
import Supplier from "./pages/masters/Supplier";
import Item from "./pages/masters/Item";
import Setup from "./pages/setup/Setup";
import Purchase from "./pages/purchase/Purchase";
import Sales from "./pages/sales/Sales";
import Inventory from "./pages/inventory/Inventory";
import Accounts from "./pages/accounts/Accounts";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/setup" element={<Setup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="masters/companies" element={<Company />} />
          <Route path="masters/customers" element={<Customer />} />
          <Route path="masters/suppliers" element={<Supplier />} />
          <Route path="masters/items" element={<Item />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="sales" element={<Sales />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
