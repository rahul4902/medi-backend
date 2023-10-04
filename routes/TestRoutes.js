// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const TestController = require("../controllers/TestController");
const { testValidation } = require("../validations/TestValidation");
const verifyTokenMiddleware = require("../helper/verifyTokenMiddleware");

router.post("/create", testValidation, TestController.create);
router.put("/update/:id", TestController.update);

router.get("/list", TestController.list);
router.patch("/status/:id", TestController.status);
router.get("/getById/:id", TestController.getById);
router.delete("/delete/:id", TestController.delete);

router.get("/autocomplete", TestController.autocomplete);

module.exports = router;
