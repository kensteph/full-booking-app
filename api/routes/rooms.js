//IMPORT EXPRESS
import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom,updateRoomAvailability } from "../controllers/ctrlRoom.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
//GET THE ROUTES MANAGER
const router=express.Router()

//DEFINE THE ROUTES

//INSERT
router.post("/:idHotel",verifyAdmin, createRoom);

//UPDATE
router.put("/:id",verifyAdmin, updateRoom);
//UPDATE AVAILABILITY DATES FOR A ROOM
router.put("/availability/:id", updateRoomAvailability);

//DELETE
router.delete("/:id/:idHotel",verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getAllRooms);


//EXPORT THE ROUTES
export default router;