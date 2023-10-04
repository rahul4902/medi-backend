// validators.js
const { body, validationResult } = require("express-validator");
const { validationResponse } = require("../helper/response");

// Registration validation middleware
const departmentValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("status").notEmpty().withMessage("Status is required"),

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
  departmentValidation,
};
