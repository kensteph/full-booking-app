//IMPORT EXPRESS
import express from "express";
import {
  countByCity,
  countByType,
  createNewHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/ctrlHotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

//GET THE ROUTES MANAGER
const router = express.Router();

//DEFINE THE ROUTES

//INSERT
router.post("/",verifyAdmin, createNewHotel);

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);

//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getAllHotels);

//NUMBER OF HOTEL BY CITY
router.get("/countByCity",countByCity);
//NUMBER OF HOTEL BY TYPE
router.get("/countByType",countByType);

//EXPORT THE ROUTES
export default router;
