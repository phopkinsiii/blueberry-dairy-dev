import { body, validationResult } from 'express-validator';

export const validateCheckout = [
  body('cartItems')
    .isArray({ min: 1 })
    .withMessage('cartItems must be a non-empty array'),

  body('cartItems.*.name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each cart item must have a name'),

  body('cartItems.*.price')
    .isFloat({ gt: 0 })
    .withMessage('Each cart item must have a valid price'),

  body('cartItems.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('Each cart item must have a valid quantity'),

  // Final check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
