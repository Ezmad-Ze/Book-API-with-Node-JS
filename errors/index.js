const BadRequestError = require("./badRequest");
const UnauthorizedError = require("./unauthorized");
const NotFoundError = require("./notFound");
const CustomAPIError = require("./customAPI");

module.exports = {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  CustomAPIError,
};
