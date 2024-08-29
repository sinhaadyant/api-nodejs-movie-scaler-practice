const { validateToken } = require("../lib/auth");

exports.checkForAuthentication = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    req.user = null;
    return next();
  }
  const token = authHeader.split("Bearer ")[1];

  const userPayload = validateToken(token);
  req.user = userPayload;

  return next();
};
exports.ensureAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Un Authenticated", error: "Un Authenticated" });
  }
  return next();
};
