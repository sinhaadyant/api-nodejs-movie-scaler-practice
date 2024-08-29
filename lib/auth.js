const JWT = require("jsonwebtoken");

const JWT_SECRET = "adyantsinhaTest@e4asdf";
exports.generateToken = (data) => {
  const paylod = JSON.stringify(data);
  const token = JWT.sign(paylod, JWT_SECRET);
  return token;
};
exports.validateToken = (token) => {
  try {
    const data = JWT.verify(token, JWT_SECRET);
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
