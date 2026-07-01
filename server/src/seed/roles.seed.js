// server/src/seed/roles.seed.js

export const DEFAULT_ROLES = [
  {
    code: "OWNER",
    name: "Owner",
    description: "Full system access.",
    system: true
  },
  {
    code: "SUPER_ADMIN",
    name: "Super Admin",
    description: "System administration.",
    system: true
  },
  {
    code: "ADMIN",
    name: "Administrator",
    description: "Company administrator.",
    system: true
  },
  {
    code: "FINANCE_MANAGER",
    name: "Finance Manager",
    description: "Finance management.",
    system: true
  },
  {
    code: "PURCHASE_MANAGER",
    name: "Purchase Manager",
    description: "Purchase management.",
    system: true
  },
  {
    code: "SALES_MANAGER",
    name: "Sales Manager",
    description: "Sales management.",
    system: true
  },
  {
    code: "STORE_MANAGER",
    name: "Store Manager",
    description: "Inventory management.",
    system: true
  },
  {
    code: "HR_MANAGER",
    name: "HR Manager",
    description: "Human resource management.",
    system: true
  },
  {
    code: "EMPLOYEE",
    name: "Employee",
    description: "Standard employee.",
    system: true
  }
];
