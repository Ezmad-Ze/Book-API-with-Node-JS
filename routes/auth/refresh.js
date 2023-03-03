const express = require("express");
const {
  handleRefreshToken,
} = require("../../controllers/authController/refreshTokenController");
const router = express.Router();

/**
 * @openapi
 * '/api/v1/refresh':
 *  get:
 *   tags:
 *    - User
 *   summary: Refresh Token
 *   responses:
 *     204:
 *       description: Information
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *
 *
 */

router.get("/", handleRefreshToken);

module.exports = router;
