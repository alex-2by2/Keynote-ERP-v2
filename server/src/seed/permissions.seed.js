// server/src/seed/permissions.seed.js

export const DEFAULT_PERMISSIONS = [
  // Company
  { code: "COMPANY_VIEW", name: "View Company" },
  { code: "COMPANY_CREATE", name: "Create Company" },
  { code: "COMPANY_UPDATE", name: "Update Company" },
  { code: "COMPANY_DELETE", name: "Delete Company" },

  // Users
  { code: "USER_VIEW", name: "View Users" },
  { code: "USER_CREATE", name: "Create User" },
  { code: "USER_UPDATE", name: "Update User" },
  { code: "USER_DELETE", name: "Delete User" },

  // Roles
  { code: "ROLE_VIEW", name: "View Roles" },
  { code: "ROLE_CREATE", name: "Create Role" },
  { code: "ROLE_UPDATE", name: "Update Role" },
  { code: "ROLE_DELETE", name: "Delete Role" },

  // Permissions
  { code: "PERMISSION_VIEW", name: "View Permissions" },
  { code: "PERMISSION_CREATE", name: "Create Permission" },
  { code: "PERMISSION_UPDATE", name: "Update Permission" },
  { code: "PERMISSION_DELETE", name: "Delete Permission" },

  // Customer
  { code: "CUSTOMER_VIEW", name: "View Customer" },
  { code: "CUSTOMER_CREATE", name: "Create Customer" },
  { code: "CUSTOMER_UPDATE", name: "Update Customer" },
  { code: "CUSTOMER_DELETE", name: "Delete Customer" },

  // Supplier
  { code: "SUPPLIER_VIEW", name: "View Supplier" },
  { code: "SUPPLIER_CREATE", name: "Create Supplier" },
  { code: "SUPPLIER_UPDATE", name: "Update Supplier" },
  { code: "SUPPLIER_DELETE", name: "Delete Supplier" },

  // Item
  { code: "ITEM_VIEW", name: "View Item" },
  { code: "ITEM_CREATE", name: "Create Item" },
  { code: "ITEM_UPDATE", name: "Update Item" },
  { code: "ITEM_DELETE", name: "Delete Item" },

  // Purchase
  { code: "PURCHASE_VIEW", name: "View Purchase" },
  { code: "PURCHASE_CREATE", name: "Create Purchase" },
  { code: "PURCHASE_APPROVE", name: "Approve Purchase" },

  // Sales
  { code: "SALES_VIEW", name: "View Sales" },
  { code: "SALES_CREATE", name: "Create Sales" },
  { code: "SALES_APPROVE", name: "Approve Sales" },

  // Inventory
  { code: "INVENTORY_VIEW", name: "View Inventory" },
  { code: "INVENTORY_UPDATE", name: "Update Inventory" },

  // Reports
  { code: "REPORT_VIEW", name: "View Reports" },

  // Settings
  { code: "SETTINGS_VIEW", name: "View Settings" },
  { code: "SETTINGS_UPDATE", name: "Update Settings" }
];
