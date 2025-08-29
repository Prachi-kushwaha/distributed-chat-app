import { body } from "express-validator";
import { query } from "express-validator";

export const createUserValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 2 }).withMessage("Username must be at least 3 characters long")
    .customSanitizer(value => value.toLowerCase().trim()),


  body("email")
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 3}).withMessage("Password must be at least 6 characters long")
    .trim()
];

export const loginValidator = [
  body("email")
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail()
    .trim(),

  body("password")
    .isLength({ min: 3 }).withMessage("Password must be at least 3 characters long")
    .trim()
];

export const searchUserValidator = [
  query("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 2 }).withMessage("Username must be at least 3 characters long")
    .customSanitizer(value => value.toLowerCase().trim()),
]
