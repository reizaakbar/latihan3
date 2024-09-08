const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, "ayam");
};

const verifyToken = (token) => {
  return jwt.verify(token, "ayam");
};

module.exports = { generateToken, verifyToken };