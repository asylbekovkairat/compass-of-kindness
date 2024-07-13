const express = require("express");

const router = express.Router();

const RegisterController = require("./registerController");

router.post("/check", RegisterController.checkAccelerator);
router.post("/accelerator", RegisterController.accelerator);
// router.post('/admin', RegisterController.admin);

module.exports = router;
