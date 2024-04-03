import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signupUser = async (req, res) => {
  const { username, fullName, password, confirmPassword, gender } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/gil?username=${username}`;
    const othersProfilePic = `https://avatar.iran.liara.run/username?username=${username}+${fullName}`;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      fullName: fullName,
      password: hashedPassword,
      profilePic: gender === "male" ? boyProfilePic : gender === "female" ? girlProfilePic : othersProfilePic,
      gender: gender,
    });

    await newUser.save();
    const getAllUsers = await User.find();

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
