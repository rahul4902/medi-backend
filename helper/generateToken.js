const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const secretKey = "123456789";
  const expiresIn = "1h";

  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = generateToken;
