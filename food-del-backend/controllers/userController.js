import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //checking for existing user
  try {
    const existing = await userModel.findOne({ email });
    // console.log(existing);

    if (existing) {
      return res
        .status(401)
        .json({ success: true, message: "Already Registered User" });
    }

    //validating the email and password length
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    } else if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password(min 6 digit)",
      });
    }

    //encrypting the password
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    //creating the user in database
    const newUser = new userModel({
      name,
      email,
      password: passwordHash,
    });

    const user = await newUser.save();

    // console.log(user);

    //creating token and sending in response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Found" });
    }

    //comparing the password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Password, Unauthorized" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, message: "User Logged in", token });
  } catch (error) {
    console.log(error);
  }
};
