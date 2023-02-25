const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOny: true,
    sameSite: "None", 
    //secure:true
  });

  const findUser = await User.findOne({ refreshToken });

  if (!findUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decode) => {
      if (err) return res.sendStatus(403);
      console.log("Attempted refresh token reuse");
      const hackedUser = await User.findOne({ username: decode.username });
      hackedUser.refreshToken = [];
      const result = await hackedUser.save();
    });
    return res.sendStatus(403);
  }

  const newRefreshTokenArray = findUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decode) => {
    if (err) {
      console.log("expired refresh token");
      findUser.refreshToken = [...newRefreshTokenArray];
      const result = findUser.save();
    }

    if (err || findUser.username !== decode.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      { UserInfo: { userId: findUser._id, username: decode.username } },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );

    const newRefreshToken = jwt.sign(
      { username: decode.username },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      }
    );
    findUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await findUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      //secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user: { username: decode.username }, accessToken });
  });
};

module.exports = { handleRefreshToken };
