import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        // Now we will decode the token.
      token = req.headers.authorization.split(" ")[1];
      //Bearer token.....
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

      req.user = await User.findById(decoded.id).select("-password");
      next();//move on to the next operation
    } catch (error) {
      console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
  }

  if(!token){
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
  
});

export { protect };
