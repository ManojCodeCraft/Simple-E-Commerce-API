const User = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({ token });
  } catch (error) {
    console.error("Error in Login function:", error);
    res.status(500).send("Internal Server Error");
  }
};

const Register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    // Basic validations
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).send("Invalid or missing name");
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email.trim())
    ) {
      return res.status(400).send("Invalid or missing email");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 10) {
      return res.status(400).send("Invalid or missing phone number");
    }

    if (isAdmin !== undefined && typeof isAdmin !== "boolean") {
      return res.status(400).send("isAdmin must be a boolean");
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .send("Email already exists. Please use a different email.");
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      phone: phone.trim(),
      isAdmin: isAdmin || false,
      street: street || "",
      apartment: apartment || "",
      zip: zip || "",
      city: city || "",
      country: country || "",
    });

    const user = await newUser.save();

    if (!user) {
      return res.status(400).send("The user cannot be created!");
    }

    const verificationToken = jwt.sign({ userId: user._id }, JWT_SECRET);

    res
      .status(201)
      .send({ verificationToken, message: "User created successfully" });
  } catch (error) {
    console.error("Error in Register function:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid user ID format");

    const user = await User.findById(id).select("-passwordHash");
    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone, city, country, isAdmin } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid user ID format");

    const updated = await User.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(city && { city }),
        ...(country && { country }),
        ...(typeof isAdmin === "boolean" && { isAdmin }),
      },
      { new: true }
    ).select("-passwordHash");

    if (!updated) return res.status(404).send("User not found");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || newPassword.length < 6)
      return res
        .status(400)
        .send("Provide valid old and new password with at least 6 characters");

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    const isMatch = bcrypt.compareSync(oldPassword, user.passwordHash);
    if (!isMatch) return res.status(400).send("Old password incorrect");

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid user ID format");

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send("User not found");

    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  Login,
  Register,
  getAllUsers,
  getUserById,
  getUserCount,
  updateUser,
  updatePassword,
  deleteUser,
};
