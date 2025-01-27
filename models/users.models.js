import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    //validate: validator.isStrongPassword
    minLength:[8,"Password must be atleast of 8 chars"]
  },
  location: {
    type: String,
    default: "India",
  },
},{
    timestamps: true
});


export const User = mongoose.model("User", userSchema);