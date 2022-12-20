import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  confirmPassword: {
    type: String,
    trim: true,
  },
});

export const User = mongoose.model("ASSIGNMENT", userSchema);
