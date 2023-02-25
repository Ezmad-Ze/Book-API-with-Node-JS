const express = require("express");
const {
  loginHandler,
} = require("../../controllers/authController/loginController");
const router = express.Router();

router.post("/", loginHandler);

module.exports = router;
