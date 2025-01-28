import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
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
      minLength: [8, "Password must be atleast of 8 chars"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = async function () {
  return JWT.sign({
    userId: this._id
  },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
