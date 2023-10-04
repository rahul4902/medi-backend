// validators.js
const { body, validationResult } = require("express-validator");
const { validationResponse } = require("../helper/response");

// Registration validation middleware
const testValidation = [
  body("department").notEmpty().withMessage("Department is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("code").notEmpty().withMessage("Code is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("color_code").notEmpty().withMessage("Color code is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("sample_qty").notEmpty().withMessage("Sample Qty is required"),
  body("remark").notEmpty().withMessage("Remark is required"),
  body("report_type").notEmpty().withMessage("Report Type is required"),
  body("sort_name").notEmpty().withMessage("Sort Name is required"),
  body("rate").notEmpty().withMessage("Rate is required"),
  body("auto_consume").notEmpty().withMessage("Auto Consume is required"),
  body("concent_form").notEmpty().withMessage("Concent Form is required"),
  body("billing_category")
    .notEmpty()
    .withMessage("Billing category is required"),
  body("max_discount").notEmpty().withMessage("Max discount is required"),

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
  testValidation,
};
