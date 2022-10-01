//IMPORT EXPRESS
import express from "express";
import { login, registerUser } from "../controllers/ctrlauth.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
//GET THE ROUTE MANAGER
const router= express.Router();

//DEFINE THE ROUTES

//REGISTER NEW USER
router.post("/register",registerUser);

//LOGIN
router.post("/login",login);

//CHECK USER ID
// router.post("/checkIn/:id",verifyUser,(req,res,next)=>{
// res.send("CHECK DONE");
// });

//CHECK ADMIN
// router.post("/checkInAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("CHECK ADMIN DONE ");
//     });

//EXPORT THE ROUTES
export default router;