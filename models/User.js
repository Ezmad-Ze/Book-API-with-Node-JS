const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: jhon doe
 *        email:
 *          type: string
 *          default: jhon.doe@example.com
 *        password:
 *          type: string
 *          default: pass123
 *    LoginInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: jhon doe
 *        password:
 *          type: string
 *          default: pass123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        user:
 *          username:
 *            type: string
 *    LoginResponse:
 *      type: object
 *      properties:
 *        user:
 *          username:
 *            type: string
 *        access_token:
 *          type: string
 */

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      maxlength: [50, "Username Too Long"],
      minlength: [3, "Username Too Short"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
