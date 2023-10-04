const jwt = require("jsonwebtoken");
const { errorResponse } = require("./response");
const secretKey = "123456789";

const verifyTokenMiddleware = (req, res, next) => {
  const tokenArray = req.header("Authorization");
  if (!tokenArray)
    return errorResponse(res, "Access denied. No token provided.");
  token = tokenArray.split(" ");
  if (!token[1]) {
    return errorResponse(res, "Access denied. No token provided.");
  }
  console.log(token[1]);
  try {
    const decodedToken = jwt.verify(token[1], secretKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Unauthorized");
  }
};

module.exports = verifyTokenMiddleware;
