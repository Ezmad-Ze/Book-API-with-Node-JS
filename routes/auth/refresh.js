const express = require("express");
const {
  handleRefreshToken,
} = require("../../controllers/authController/refreshTokenController");
const router = express.Router();

router.get("/", handleRefreshToken);

module.exports = router;
