const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  // declaring a token variable
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // decoding the token id
      const decoded = jwt.verify(token, "3mor");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      throw new Error("Not authorized, token mch mawjoud");
    }
  } else {
    throw new Error("Not authorized, no token provided");
  }
});

module.exports = { protect };
