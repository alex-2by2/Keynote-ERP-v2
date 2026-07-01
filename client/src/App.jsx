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
        </Route>
      </Route>
    </Routes>
  );
}
