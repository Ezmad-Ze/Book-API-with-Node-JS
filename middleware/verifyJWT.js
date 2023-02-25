const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorizaton;
  if (!authHeaders?.startsWith("Bearer")) {
    return res.sendStatus(401);
  }
  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.UserInfo.username;
    req.id = decode.UserInfo.userId;
    next();
  });
};

module.exports = verifyJWT;
