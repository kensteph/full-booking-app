//IMPORT MONGOOSE
import mongoose from "mongoose";

//CREATE THE SCHEMA
const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

//EXPORT THE SCHEMA IN ORDER TO USE IT
export default mongoose.model("Room", RoomSchema);
