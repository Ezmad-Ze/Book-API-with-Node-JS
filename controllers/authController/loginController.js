const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthorizedError } = require("../../errors");

const loginHandler = async (req, res) => {
  const cookies = req?.cookies;
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("Username and Password required");

  const findUser = await User.findOne({ username });
  if (!findUser) throw new UnauthorizedError(`Invalid Credential`);

  const comparePwd = await bcrypt.compare(password, findUser.password);
  if (comparePwd) {
    const accessToken = jwt.sign(
      { UserInfo: { userId: findUser._id, username } },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      }
    );

    const newRefreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });

    let newRefreshTokenArray = !cookies?.jwt
      ? findUser.refreshToken
      : findUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const findToken = await User.findOne({ refreshToken });
      if (!findToken) {
        console.log("Attempted refresh token reuse");
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        //secure: true,
      });
    }

    findUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await findUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      //secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user: { username }, accessToken });
  } else {
    throw new UnauthorizedError("Invalid Credentials");
  }
};

module.exports = { loginHandler };
