import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// create a new user
export const signupUser = async (req, res) => {
  const { username, fullName, password, confirmPassword, gender } = req.body;
  try {
    // check if the user has entered all the fields
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
    // check if the username already exists
    const user = await User.findOne({ username: username });

    // if the username already exists, return an error message
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }

    // create a profile picture for the user
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/gil?username=${username}`;
    const othersProfilePic = `https://avatar.iran.liara.run/username?username=${username}+${fullName}`;

    // hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      username: username,
      fullName: fullName,
      password: hashedPassword,
      profilePic: gender === "male" ? boyProfilePic : gender === "female" ? girlProfilePic : othersProfilePic,
      gender: gender,
    });
    // save the user to the database
    await newUser.save();

    // get all the users
    const getAllUsers = await User.find();

    // return a success message to the user
    res.status(201).json({
      message: "user created successfully",
      user: { getAllUsers },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
  } catch (err) {
    res.end("loginUser", err);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.send("logoutUser");
  } catch (err) {
    res.end("logoutUser", err);
  }
};
