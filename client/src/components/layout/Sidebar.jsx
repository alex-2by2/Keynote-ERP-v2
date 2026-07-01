import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/app"
  },
  {
    name: "Companies",
    path: "/app/masters/companies"
  },
  {
    name: "Customers",
    path: "/app/masters/customers"
  },
  {
    name: "Suppliers",
    path: "/app/masters/suppliers"
  },
  {
    name: "Items",
    path: "/app/masters/items"
  },
  {
    name: "Purchase",
    path: "/app/purchase"
  },
  {
    name: "Sales",
    path: "/app/sales"
  },
  {
    name: "Inventory",
    path: "/app/inventory"
  },
  {
    name: "Accounts",
    path: "/app/accounts"
  },
  {
    name: "Reports",
    path: "/app/reports"
  },
  {
    name: "Settings",
    path: "/app/settings"
  }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Keynote ERP</h2>

      <nav>
        {menus.map((menu) => (
          <NavLink key={menu.path} to={menu.path}>
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
