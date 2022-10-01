import jwt from "jsonwebtoken";
import { createError } from "./custumError.js";

//VERIFY TOKEN
export const verifyToken = (req, res, next) => {
  //READ THE COOKIE FROM THE CLIENT
  const token = req.cookies.access_token;
  //VERIFY IF THERE IS NO TOKEN
  if (!token) return next(createError(401, "You are not authenticated!"));
  //ELSE VERIFY IF THE TOKEN IS CORRECT
  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = userInfo;
    next();
  });
};

//VERIFY IF IS AN USER
export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next,() => {
    if (req.user.id === req.params.id || req.user.isadmin) {
      next();
    } else {
      return next(createError(401, "You are not authorized"));
    }
  });
};

//VERIFY IF IS AN ADMIN
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next,() => {
    if (req.user.isadmin) {
      next();
    } else {
      return next(createError(401, "You are not an admin"));
    }
  });
};
