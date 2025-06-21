import { body } from 'express-validator';

export const registerValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required'),
    
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('password')
    .isStrongPassword().withMessage(
      'Password must include uppercase, lowercase, number, symbol, and be at least 8 characters.'
    ),
];

