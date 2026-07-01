// client/src/App.jsx

import {
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import AppLayout from "./layouts/AppLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        element={<ProtectedRoute />}
      >
        <Route
          path="/app"
          element={<AppLayout />}
        >
          <Route
            index
            element={<Dashboard />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
