// server/src/validators/common.validator.js

import { body, param, query } from "express-validator";

export const objectId = field =>
  body(field)
    .isMongoId()
    .withMessage(`${field} must be a valid id`);

export const requiredString = (
  field,
  max = 255
) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${field} is required`)
    .isLength({
      max
    })
    .withMessage(
      `${field} maximum length is ${max}`
    );

export const optionalString = (
  field,
  max = 255
) =>
  body(field)
    .optional()
    .trim()
    .isLength({
      max
    })
    .withMessage(
      `${field} maximum length is ${max}`
    );

export const email = field =>
  body(field)
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail();

export const optionalEmail = field =>
  body(field)
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail();

export const positiveNumber = field =>
  body(field)
    .isFloat({
      min: 0
    })
    .withMessage(
      `${field} must be greater than or equal to zero`
    );

export const optionalPositiveNumber = field =>
  body(field)
    .optional()
    .isFloat({
      min: 0
    })
    .withMessage(
      `${field} must be greater than or equal to zero`
    );

export const booleanField = field =>
  body(field)
    .optional()
    .isBoolean()
    .withMessage(
      `${field} must be boolean`
    );

export const dateField = field =>
  body(field)
    .isISO8601()
    .withMessage(
      `${field} must be a valid date`
    );

export const optionalDateField = field =>
  body(field)
    .optional()
    .isISO8601()
    .withMessage(
      `${field} must be a valid date`
    );

export const objectIdParam = (
  field = "id"
) =>
  param(field)
    .isMongoId()
    .withMessage(
      `${field} must be a valid id`
    );

export const pagination = [
  query("page")
    .optional()
    .isInt({
      min: 1
    }),

  query("limit")
    .optional()
    .isInt({
      min: 1,
      max: 100
    }),

  query("search")
    .optional()
    .trim()
];
