import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  //RETREIVE THE HOTEL ID FOR WICH WE GONNA ADD THIS ROOM
  const hotelId = req.params.idHotel;
  //CREATE THE NEW ROOM
  const newRoom = new Room(req.body);
  try {
    //SAVE THE ROOM
    const savedRoom = await newRoom.save();
    //UPDATE THE HOTEL COLLECTION(ADD THE ROOM ID IN THE ROOM LIST)
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      }); /*We use $push because the type of rooms is String[]*/
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//UPDATE EXISTING Room
export const updateRoom = async (req, res,next) => {
  //CREATE A MODEL AND RETREIVE THE DATA TO CHANGE
  const updateRoom = req.body;
  const idToUpdate = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      idToUpdate,
      { $set: updateRoom },
      { new: true } /*Return the updated data*/
    ); /*  $set : Keyword to perform the update */
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

//DELETE Room
export const deleteRoom = async (req, res,next) => {
  //GET THE ID TO DELETE
  const idToDelete = req.params.id;
  //RETREIVE THE HOTEL ID FOR WICH WE GONNA REMOVE THIS ROOM
  const hotelId = req.params.idHotel;
  try {
    //UPDATE THE HOTEL COLLECTION(REMOVE THE DELETED ROOM ID IN THE ROOM LIST)
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: idToDelete },
      }); /*We use $pull because the type of rooms is String[]*/
    } catch (error) {
      next(error);
    }
    const deletedRoom = await Room.findByIdAndDelete(idToDelete);
    res.status(200).json(deletedRoom);
  } catch (error) {
    next(error);
  }
};

//GET Room BY ID
export const getRoom = async (req, res, next) => {
  //GET THE ID
  const roomId = req.params.id;
  try {
    const roomFound = await Room.findById(roomId);
    res.status(200).json(roomFound);
  } catch (error) {
    next(error);
  }
};

//GET ALL RoomS
export const getAllRooms = async (req, res, next) => {
  try {
    const roomsFound = await Room.find();
    res.status(200).json(roomsFound);
  } catch (error) {
    next(error);
  }
};
