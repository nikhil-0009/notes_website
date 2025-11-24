import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, validUser.password);

    if (!matchedPassword) {
      return res.status(401).json({ message: "The password does not match" });
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        email: validUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const userObj = {
      _id: validUser._id,
      name: validUser.name,
      email: validUser.email,
    };

    // console.log("User logged in:", userObj);    

    return res.status(200).json({
      message: "User logged in successfullyy!!!",
      user: userObj,
      token,
    });

  } catch (error) {
    return res.json({ message: error.message });
  }
};


export const userSignUp = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists!!!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(201).json({
        message:"User created sucess!!!!!",
         user: {
        _id: validUser._id,
        name: validUser.name,
        email: validUser.email,
      },
        token
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
