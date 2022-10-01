//IMPORT EXPRESS
import express from "express";
//IMPORT DOTENV IN ORDER TO ACCESS THE VARIABLES IN .env FILE
import dotenv from "dotenv";
//EASY MONGODB MANAGEMENT
import mongoose from "mongoose";
//USINNG COOKIE
import cookieParser from"cookie-parser";
//CORS
import cors from "cors";

//CREATION OF THE APP
const app = express();
//CONFIG DOTENV IN ORDER TO USE IT
dotenv.config();

//IMPORT OUR ROUTES
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import hotelsRoutes from "./routes/hotels.js";
import roomsRoutes from "./routes/rooms.js";

//MIDDLEWARES
app.use(cors());
app.use(cookieParser()); /*Allows us to use cookies*/
app.use(express.json()); /*Allows express to receive JSON*/
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

//ERROR HANDLER MIDLLEWARE
app.use((error, req, res, next) => {
  const errStatus = error.status || 500;
  const errMessage = error.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    errorDetails: error.stack
  });
});

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

//LISTEN FOR REQUEST
app.listen(8788, () => {
  connect();
  console.log("Connected to backend!");
});
