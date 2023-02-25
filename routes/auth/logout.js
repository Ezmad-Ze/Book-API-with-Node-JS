const express = require("express");
const {
  logoutHandler,
} = require("../../controllers/authController/logoutController");
const router = express.Router();

router.get("/", logoutHandler);

module.exports = router;
