// validators.js
const { body, validationResult } = require("express-validator");
const { validationResponse } = require("../helper/response");

// Registration validation middleware
const registrationValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    var errorArray = [];
    if (!errors.isEmpty()) {
      const uniquePaths = new Set();
      const uniqueErrorsObject = errors.array().reduce((accumulator, _v) => {
        if (!uniquePaths.has(_v.path)) {
          uniquePaths.add(_v.path);
          accumulator[_v.path] = _v.msg;
        }
        return accumulator;
      }, {});

      return validationResponse(res, "validation Error", uniqueErrorsObject);
    } else {
      next(); // Move to the next middleware or route handler
    }
  },
];

// Export the middleware
module.exports = {
  registrationValidation,
};
