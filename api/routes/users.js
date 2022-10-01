//IMPORT EXPRESS
import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/ctrlUser.js";
import { verifyUser } from "../utils/verifyToken.js";


//GET THE ROUTES MANAGER
const router = express.Router();

//DEFINE THE ROUTES

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getAllUsers);

//EXPORT THE ROUTES
export default router;
