//IMPORT MONGOOSE
import mongoose from "mongoose";

//CREATE THE SCHEMA
const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photos: { type: [String] },
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rooms: { type: [String] },
    minPrice: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//EXPORT THE SCHEMA IN ORDER TO USE IT
export default mongoose.model("Hotel", HotelSchema);
