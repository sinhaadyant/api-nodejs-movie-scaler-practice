const User = require("../models/user");
const { generateToken } = require("../lib/auth");
let crypto;
try {
  crypto = require("node:crypto");
} catch (err) {
  console.error("crypto support is disabled!");
}
exports.handleSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const salt = crypto.randomBytes(256).toString("hex");
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    const user = await User.create({
      firstName,
      lastName,
      email,
      salt,
      password: hashedPassword,
    });
    return res.json({
      status: true,
      data: { _id: user._id },
      message: "Signup Successfully",
    });
  } catch (error) {
    return res.json({ status: true, error });
  }
};

exports.handleSignin = async (req, res) => {
  const { email, password } = req.body;
  const userInDb = await User.findOne({ email });
  if (!userInDb) {
    return res
      .status(401)
      .json({ status: false, message: `User with ${email} not found` });
  }
  const salt = userInDb.salt;
  const passwordInDb = userInDb.password;
  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (passwordInDb !== hashedPassword)
    return res
      .status(401)
      .json({ status: false, message: `Incorrect Email / Password` });

  const token = generateToken({ _id: userInDb._id });
  return res.json({ status: true, data: { token }, message: "Sigin Success" });
};
