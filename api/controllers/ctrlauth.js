import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/custumError.js";
import jwt from "jsonwebtoken";

//REGISTER
export const registerUser = async (req, res, next) => {
  //CREATE A MODEL AND RETREIVE THE DATA FROM THE REQUEST
  let data = req.body;
  console.log(data);
  let pass = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(pass, salt);
  data.password = hash;
  console.log(data);
  const newUser = new User(data);
  try {
    //SAVE THE NEW USER
    const registeredUser = await newUser.save();
    res.status(200).json(registeredUser);
  } catch (error) {
    next(error);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  //CREATE A MODEL AND RETREIVE THE DATA FROM THE REQUEST
  let data = req.body;
  console.log("LOGIN ATTEMPT : ",data);
  try {
    //SEARCH USER
    const userFound = await User.findOne({ username: data.username });
    if (!userFound) return next(createError(404, "User not found"));

    //COMPARE THE PASSWORD
    let verify = bcrypt.compareSync(data.password, userFound.password);
    if (!verify) return next(createError(404, "Your password is incorrect"));
    //DESTRUCTURATIOON OF USER IN ORDER TO SEND ONLY OTHER INFO
    const { password, isadmin, ...otherInfo } = userFound._doc;
    //GENERATION A TOKEN FOR THE USER
    const token = jwt.sign(
      { id: userFound._id, isadmin: userFound.isadmin },
      process.env.JWT_KEY
    );
    res
      .cookie("access_token", token, {
        httpOnly: true /*For security purpose*/,
      })
      .status(200)
      .json(otherInfo);
  } catch (error) {
    next(error);
  }
};
