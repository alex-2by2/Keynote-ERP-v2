// server/src/validators/purchaseInvoice.validator.js

import { body } from "express-validator";

import validateRequest from "../middleware/validateRequest.js";

export const createPurchaseInvoiceValidator = [
  body("company")
    .isMongoId()
    .withMessage("Valid company is required"),

  body("supplier")
    .isMongoId()
    .withMessage("Valid supplier is required"),

  body("purchaseOrder")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid purchase order"),

  body("goodsReceipt")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid goods receipt"),

  body("invoiceNumber")
    .trim()
    .notEmpty()
    .withMessage("Invoice number is required")
    .isLength({
      max: 50
    })
    .withMessage(
      "Invoice number cannot exceed 50 characters"
    ),

  body("invoiceDate")
    .isISO8601()
    .withMessage("Valid invoice date is required"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),

  body("items")
    .isArray({
      min: 1
    })
    .withMessage(
      "At least one invoice item is required"
    ),

  body("items.*.item")
    .isMongoId()
    .withMessage("Invalid item"),

  body("items.*.quantity")
    .isFloat({
      gt: 0
    })
    .withMessage(
      "Quantity must be greater than zero"
    ),

  body("items.*.unitCost")
    .isFloat({
      min: 0
    })
    .withMessage(
      "Unit cost must be zero or greater"
    ),

  body("items.*.discount")
    .optional()
    .isFloat({
      min: 0
    })
    .withMessage(
      "Discount cannot be negative"
    ),

  body("items.*.taxPercentage")
    .optional()
    .isFloat({
      min: 0,
      max: 100
    })
    .withMessage(
      "Tax percentage must be between 0 and 100"
    ),

  body("remarks")
    .optional()
    .trim()
    .isLength({
      max: 500
    })
    .withMessage(
      "Remarks cannot exceed 500 characters"
    ),

  validateRequest
];

export const updatePurchaseInvoiceValidator = [
  body("invoiceNumber")
    .optional()
    .trim()
    .isLength({
      max: 50
    })
    .withMessage(
      "Invoice number cannot exceed 50 characters"
    ),

  body("status")
    .optional()
    .isIn([
      "DRAFT",
      "POSTED",
      "PAID",
      "CANCELLED"
    ])
    .withMessage("Invalid status"),

  body("remarks")
    .optional()
    .trim()
    .isLength({
      max: 500
    })
    .withMessage(
      "Remarks cannot exceed 500 characters"
    ),

  validateRequest
];
