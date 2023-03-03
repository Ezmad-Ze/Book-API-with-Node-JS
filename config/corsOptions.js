const allowedOrigins = require("../config/allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) === -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
