const express = require("express");
const {
  handleRegister,
} = require("../../controllers/authController/registerController");
const router = express.Router();

router.post("/", handleRegister);

module.exports = router;
