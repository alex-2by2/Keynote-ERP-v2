// server/src/seed/permissions.seed.js

export const DEFAULT_PERMISSIONS = [
  // Company
  { code: "COMPANY_VIEW", name: "View Company", module: "Company" },
  { code: "COMPANY_CREATE", name: "Create Company", module: "Company" },
  { code: "COMPANY_UPDATE", name: "Update Company", module: "Company" },
  { code: "COMPANY_DELETE", name: "Delete Company", module: "Company" },

  // Users
  { code: "USER_VIEW", name: "View Users", module: "Users" },
  { code: "USER_CREATE", name: "Create User", module: "Users" },
  { code: "USER_UPDATE", name: "Update User", module: "Users" },
  { code: "USER_DELETE", name: "Delete User", module: "Users" },

  // Roles
  { code: "ROLE_VIEW", name: "View Roles", module: "Roles" },
  { code: "ROLE_CREATE", name: "Create Role", module: "Roles" },
  { code: "ROLE_UPDATE", name: "Update Role", module: "Roles" },
  { code: "ROLE_DELETE", name: "Delete Role", module: "Roles" },

  // Permissions
  { code: "PERMISSION_VIEW", name: "View Permissions", module: "Permissions" },
  { code: "PERMISSION_CREATE", name: "Create Permission", module: "Permissions" },
  { code: "PERMISSION_UPDATE", name: "Update Permission", module: "Permissions" },
  { code: "PERMISSION_DELETE", name: "Delete Permission", module: "Permissions" },

  // Customer
  { code: "CUSTOMER_VIEW", name: "View Customer", module: "Customer" },
  { code: "CUSTOMER_CREATE", name: "Create Customer", module: "Customer" },
  { code: "CUSTOMER_UPDATE", name: "Update Customer", module: "Customer" },
  { code: "CUSTOMER_DELETE", name: "Delete Customer", module: "Customer" },

  // Supplier
  { code: "SUPPLIER_VIEW", name: "View Supplier", module: "Supplier" },
  { code: "SUPPLIER_CREATE", name: "Create Supplier", module: "Supplier" },
  { code: "SUPPLIER_UPDATE", name: "Update Supplier", module: "Supplier" },
  { code: "SUPPLIER_DELETE", name: "Delete Supplier", module: "Supplier" },

  // Item
  { code: "ITEM_VIEW", name: "View Item", module: "Item" },
  { code: "ITEM_CREATE", name: "Create Item", module: "Item" },
  { code: "ITEM_UPDATE", name: "Update Item", module: "Item" },
  { code: "ITEM_DELETE", name: "Delete Item", module: "Item" },

  // Purchase
  { code: "PURCHASE_VIEW", name: "View Purchase", module: "Purchase" },
  { code: "PURCHASE_CREATE", name: "Create Purchase", module: "Purchase" },
  { code: "PURCHASE_APPROVE", name: "Approve Purchase", module: "Purchase" },

  // Sales
  { code: "SALES_VIEW", name: "View Sales", module: "Sales" },
  { code: "SALES_CREATE", name: "Create Sales", module: "Sales" },
  { code: "SALES_APPROVE", name: "Approve Sales", module: "Sales" },

  // Inventory
  { code: "INVENTORY_VIEW", name: "View Inventory", module: "Inventory" },
  { code: "INVENTORY_UPDATE", name: "Update Inventory", module: "Inventory" },

  // Reports
  { code: "REPORT_VIEW", name: "View Reports", module: "Reports" },

  // Settings
  { code: "SETTINGS_VIEW", name: "View Settings", module: "Settings" },
  { code: "SETTINGS_UPDATE", name: "Update Settings", module: "Settings" }
];
