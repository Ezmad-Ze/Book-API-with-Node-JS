const express = require("express");
const {
  logoutHandler,
} = require("../../controllers/authController/logoutController");
const router = express.Router();

/**
 * @openapi
 * '/api/v1/logout':
 *  get:
 *   tags:
 *    - User
 *   summary: User Logout
 *   responses:
 *     204:
 *       description: Information
 *     400:
 *       description: Bad Request
 *
 *
 */

router.get("/", logoutHandler);

module.exports = router;
