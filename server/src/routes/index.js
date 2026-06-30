// server/src/routes/index.js

import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";

import userRoutes from "./user.routes.js";
import roleRoutes from "./role.routes.js";
import permissionRoutes from "./permission.routes.js";

import companyRoutes from "./company.routes.js";
import branchRoutes from "./branch.routes.js";
import departmentRoutes from "./department.routes.js";
import designationRoutes from "./designation.routes.js";
import employeeRoutes from "./employee.routes.js";

import financialYearRoutes from "./financialYear.routes.js";
import costCenterRoutes from "./costCenter.routes.js";
import warehouseRoutes from "./warehouse.routes.js";
import unitOfMeasureRoutes from "./unitOfMeasure.routes.js";
import itemCategoryRoutes from "./itemCategory.routes.js";
import itemRoutes from "./item.routes.js";
import stockRoutes from "./stock.routes.js";

import supplierRoutes from "./supplier.routes.js";
import customerRoutes from "./customer.routes.js";
import purchaseOrderRoutes from "./purchaseOrder.routes.js";
import salesOrderRoutes from "./salesOrder.routes.js";
import goodsReceiptRoutes from "./goodsReceipt.routes.js";
import goodsIssueRoutes from "./goodsIssue.routes.js";
import inventoryTransactionRoutes from "./inventoryTransaction.routes.js";
import stockTransferRoutes from "./stockTransfer.routes.js";
import purchaseReturnRoutes from "./purchaseReturn.routes.js";
import salesReturnRoutes from "./salesReturn.routes.js";

import accountGroupRoutes from "./accountGroup.routes.js";
import accountLedgerRoutes from "./accountLedger.routes.js";
import voucherRoutes from "./voucher.routes.js";
import journalEntryRoutes from "./journalEntry.routes.js";
import purchaseInvoiceRoutes from "./purchaseInvoice.routes.js";
import salesInvoiceRoutes from "./salesInvoice.routes.js";
import paymentRoutes from "./payment.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);

router.use("/companies", companyRoutes);
router.use("/branches", branchRoutes);
router.use("/departments", departmentRoutes);
router.use("/designations", designationRoutes);
router.use("/employees", employeeRoutes);

router.use("/financial-years", financialYearRoutes);
router.use("/cost-centers", costCenterRoutes);
router.use("/warehouses", warehouseRoutes);
router.use("/units", unitOfMeasureRoutes);
router.use("/item-categories", itemCategoryRoutes);
router.use("/items", itemRoutes);
router.use("/stocks", stockRoutes);

router.use("/suppliers", supplierRoutes);
router.use("/customers", customerRoutes);
router.use("/purchase-orders", purchaseOrderRoutes);
router.use("/sales-orders", salesOrderRoutes);
router.use("/goods-receipts", goodsReceiptRoutes);
router.use("/goods-issues", goodsIssueRoutes);
router.use("/inventory-transactions", inventoryTransactionRoutes);
router.use("/stock-transfers", stockTransferRoutes);
router.use("/purchase-returns", purchaseReturnRoutes);
router.use("/sales-returns", salesReturnRoutes);

router.use("/account-groups", accountGroupRoutes);
router.use("/account-ledgers", accountLedgerRoutes);
router.use("/vouchers", voucherRoutes);
router.use("/journal-entries", journalEntryRoutes);
router.use(
  "/purchase-invoices",
  purchaseInvoiceRoutes
);
router.use(
  "/sales-invoices",
  salesInvoiceRoutes
);
router.use("/payments", paymentRoutes);

export default router;
