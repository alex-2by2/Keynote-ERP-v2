// server/src/validators/receipt.validator.js

import { body } from "express-validator";

import validateRequest from "../middleware/validateRequest.js";

export const createReceiptValidator = [
  body("company")
    .isMongoId()
    .withMessage("Valid company is required"),

  body("customer")
    .isMongoId()
    .withMessage("Valid customer is required"),

  body("salesInvoice")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid sales invoice"),

  body("accountLedger")
    .isMongoId()
    .withMessage("Valid account ledger is required"),

  body("receiptNumber")
    .trim()
    .notEmpty()
    .withMessage("Receipt number is required")
    .isLength({
      max: 50
    })
    .withMessage(
      "Receipt number cannot exceed 50 characters"
    ),

  body("receiptDate")
    .isISO8601()
    .withMessage("Valid receipt date is required"),

  body("receiptMethod")
    .isIn([
      "CASH",
      "BANK",
      "CHEQUE",
      "UPI",
      "CARD",
      "NEFT",
      "RTGS",
      "IMPS"
    ])
    .withMessage("Invalid receipt method"),

  body("referenceNumber")
    .optional()
    .trim()
    .isLength({
      max: 100
    })
    .withMessage(
      "Reference number cannot exceed 100 characters"
    ),

  body("amount")
    .isFloat({
      gt: 0
    })
    .withMessage(
      "Amount must be greater than zero"
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

export const updateReceiptValidator = [
  body("receiptNumber")
    .optional()
    .trim()
    .isLength({
      max: 50
    })
    .withMessage(
      "Receipt number cannot exceed 50 characters"
    ),

  body("receiptMethod")
    .optional()
    .isIn([
      "CASH",
      "BANK",
      "CHEQUE",
      "UPI",
      "CARD",
      "NEFT",
      "RTGS",
      "IMPS"
    ])
    .withMessage("Invalid receipt method"),

  body("status")
    .optional()
    .isIn([
      "DRAFT",
      "POSTED",
      "CANCELLED"
    ])
    .withMessage("Invalid status"),

  body("amount")
    .optional()
    .isFloat({
      gt: 0
    })
    .withMessage(
      "Amount must be greater than zero"
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
