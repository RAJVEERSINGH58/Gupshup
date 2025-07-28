import { appError } from "../utils/errors/app-error.js";
import { asyncHandler } from "../utils/async/asyncHandler.js";
import { verifyToken } from "../utils/common/token.js";

export const isAuthenticated  = asyncHandler(async (req , res , next) =>{
  const token = req.cookies.token;
  if (!token) {
    return next(new appError("Invalid token" , 400));
  }
  const tokenData = verifyToken(token);
  req.user = tokenData;
  next();
})