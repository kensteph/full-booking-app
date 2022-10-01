//IMPORT MONGOOSE
import mongoose from "mongoose";

//CREATE THE SCHEMA
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isadmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//EXPORT THE SCHEMA IN ORDER TO USE IT
export default mongoose.model("User", UserSchema);
