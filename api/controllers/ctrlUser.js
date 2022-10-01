import User from "../models/User.js";
  //UPDATE EXISTING User
  export const updateUser=async (req, res) => {
    //CREATE A MODEL AND RETREIVE THE DATA TO CHANGE
    const updateUser = req.body;
    const idToUpdate = req.params.id;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        idToUpdate,
        { $set: updateUser },
        { new: true } /*Return the updated data*/
      ); /*  $set : Keyword to perform the update */
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error)
    }
  };

  //DELETE User
  export const deleteUser=async (req, res) => {
    //GET THE ID TO DELETE
    const idToDelete = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(idToDelete);
      res.status(200).json(deletedUser);
    } catch (error) {
      next(error);
    }
  };

  //GET User BY ID
  export const getUser=async (req, res,next) => {
    //GET THE ID
    const userId = req.params.id;
    try {
      const userFound = await User.findById(userId);
      res.status(200).json(userFound);
    } catch (error) {
      next(error);
    }
  };

  //GET ALL UserS
  export const getAllUsers=async (req, res, next) => {
    try {
      const usersFound = await User.find();
      res.status(200).json(usersFound);
    } catch (error) {
      next(error);
    }
  };

