const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("Username and Password required");

  //Hash the password
  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPwd,
    email,
  });

  res.status(StatusCodes.CREATED).json({ user: { username } });
};

module.exports = { handleRegister };
