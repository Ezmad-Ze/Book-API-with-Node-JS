const express = require("express");
const {
  handleRegister,
} = require("../../controllers/authController/registerController");
const router = express.Router();

/**
 * @openapi
 * '/api/v1/register':
 *  post:
 *   tags:
 *    - User
 *   summary: Register new user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateUserInput'
 *   responses:
 *     200:
 *       description: Success
 *       contents:
 *         application/json:
 *         schema:
 *           $ref: '#/components/schemas/CreateUserResponse'
 *     400:
 *       description: Bad Request
 *
 *
 */
router.post("/", handleRegister);

module.exports = router;
