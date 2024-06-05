const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  // const authorizationHeader = req.header("Authorization");

  // if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Invalid authorization header" });
  // }
  // const token = authorizationHeader.replace("Bearer ", "");
  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Authorization token not found" });
  // }
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   console.error(err);
  //   return res.status(401).json({ success: false, message: "Invalid token" });
  // }
  // let token;
  // if (req?.headers?.authorization?.startsWith("Bearer")) {
  //   token = req.headers.authorization.split(" ")[1];
  //   try {
  //     if (token) {
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       console.log(decoded);
  //       const user = await User.findById(decoded?.id);
  //       req.user = user;
  //       next();
  //     }
  //   } catch (error) {
  //     throw new Error("Not Authorized token expired. Please Login again!");
  //   }
  // } else {
  //   throw new Error("There is no token attached to header");
  // }

  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const user = await User.findById(decoded?.id);
        if (!user) {
          return res
            .status(401)
            .json({ message: "Not Authorized, user not found" });
        }

        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Not Authorized, token not found" });
      }
    } catch (error) {
      return res
        .status(401)
        .json({
          message:
            "Not Authorized, token expired or invalid. Please login again!",
        });
    }
  } else {
    return res
      .status(401)
      .json({ message: "There is no token attached to header" });
  }
});
module.exports = { authMiddleware };
