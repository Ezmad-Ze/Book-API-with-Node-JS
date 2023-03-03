const express = require("express");
const {
  loginHandler,
} = require("../../controllers/authController/loginController");
const router = express.Router();

/**
 * @openapi
 * '/api/v1/login':
 *  post:
 *   tags:
 *    - User
 *   summary: User Login
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/LoginInput'
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/LoginResponse'
 *     400:
 *       description: Bad Request
 *
 *
 */

router.post("/", loginHandler);

module.exports = router;
