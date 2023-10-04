// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const UserController = require("../controllers/UserController");
const { registrationValidation } = require("../validations/UserValidation");
const verifyTokenMiddleware = require("../helper/verifyTokenMiddleware");
// Registration route
router.post("/register", registrationValidation, UserController.register);
router.post("/login", UserController.login);
router.post("/logout", verifyTokenMiddleware, UserController.logout);

module.exports = router;
