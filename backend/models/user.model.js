import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    gender: {
      type: String,
      required: true,
      Enumerator: ["male", "female", "other"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScheme);

export default User;
