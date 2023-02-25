const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./customAPI");

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
