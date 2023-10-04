// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const DepartmentController = require("../controllers/DepartmentController");
const { departmentValidation } = require("../validations/DepartmentValidation");
const verifyTokenMiddleware = require("../helper/verifyTokenMiddleware");

router.post("/create", departmentValidation, DepartmentController.create);
router.put("/update/:id", DepartmentController.update);

router.get("/list", DepartmentController.list);
router.patch("/status/:id", DepartmentController.status);
router.get("/getById/:id", DepartmentController.getById);
router.delete("/delete/:id", DepartmentController.delete);

module.exports = router;
