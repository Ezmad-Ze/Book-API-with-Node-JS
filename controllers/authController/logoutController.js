const User = require("../../models/User");

const logoutHandler = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const findUser = await User.findOne({ refreshToken });
  if (!findUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      //secure:true
    });
    return res.sendStatus(204);
  }

  findUser.refreshToken = findUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await findUser.save();


  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    //secure:true
  });
  res.sendStatus(204);
};

module.exports = { logoutHandler };
