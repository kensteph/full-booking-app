import Hotel from "../models/Hotel.js";

//CREATE A NEW HOTEL
export const createNewHotel = async (req, res, next) => {
  //CREATE A MODEL AND RETREIVE THE DATA FROM THE REQUEST
  const newHotel = new Hotel(req.body);
  try {
    //SAVE THE NEW HOTEL
    const savedHotel = await newHotel.save();
    //SUCCESS
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//UPDATE EXISTING HOTEL
export const updateHotel = async (req, res, next) => {
  //CREATE A MODEL AND RETREIVE THE DATA TO CHANGE
  const updateHotel = req.body;
  const idToUpdate = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      idToUpdate,
      { $set: updateHotel },
      { new: true } /*Return the updated data*/
    ); /*  $set : Keyword to perform the update */
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

//DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
  //GET THE ID TO DELETE
  const idToDelete = req.params.id;
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(idToDelete);
    res.status(200).json(deletedHotel);
  } catch (error) {
    next(error);
  }
};

//GET HOTEL BY ID
export const getHotel = async (req, res, next) => {
  //GET THE ID
  const hotelId = req.params.id;
  try {
    const hotelFound = await Hotel.findById(hotelId);
    res.status(200).json(hotelFound);
  } catch (error) {
    next(error);
  }
};

//GET ALL HOTELS
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  console.log( req.query);
  try {
    const hotelsFound = await Hotel.find({
      ...others,
      minPrice: { $gt: min || 1, $lt: max || 1000 } /*$gt:> $lt<*/,
    }).limit(req.query.limit); 
    res.status(200).json(hotelsFound);
  } catch (error) {
    next(error);
  }
};

//COUNT HOTEL BY CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

//COUNT HOTEL BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const countHotel = await Hotel.countDocuments({ type: "Hotel" });
    const countApartment = await Hotel.countDocuments({ type: "Apartment" });
    const countResort = await Hotel.countDocuments({ type: "Resort" });
    const countVilla = await Hotel.countDocuments({ type: "Villa" });
    const countCabin = await Hotel.countDocuments({ type: "Cabin" });
    const counts = [
      { type: "Hotels", count: countHotel },
      { type: "Apartments", count: countApartment },
      { type: "Resorts", count: countResort },
      { type: "Villas", count: countVilla },
      { type: "Cabins", count: countCabin },
    ];
    console.log(counts);
    res.status(200).json(counts);
  } catch (error) {
    next(error);
  }
};
