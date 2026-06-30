// server/src/validators/payment.validator.js

import { body } from "express-validator";

import validateRequest from "../middleware/validateRequest.js";

export const createPaymentValidator = [
  body("company")
    .isMongoId()
    .withMessage("Valid company is required"),

  body("supplier")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid supplier"),

  body("customer")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid customer"),

  body("purchaseInvoice")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid purchase invoice"),

  body("salesInvoice")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid sales invoice"),

  body("accountLedger")
    .isMongoId()
    .withMessage("Valid account ledger is required"),

  body("paymentNumber")
    .trim()
    .notEmpty()
    .withMessage("Payment number is required")
    .isLength({
      max: 50
    })
    .withMessage(
      "Payment number cannot exceed 50 characters"
    ),

  body("paymentDate")
    .isISO8601()
    .withMessage("Valid payment date is required"),

  body("paymentMethod")
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
    .withMessage("Invalid payment method"),

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

export const updatePaymentValidator = [
  body("paymentNumber")
    .optional()
    .trim()
    .isLength({
      max: 50
    })
    .withMessage(
      "Payment number cannot exceed 50 characters"
    ),

  body("paymentMethod")
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
    .withMessage("Invalid payment method"),

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
