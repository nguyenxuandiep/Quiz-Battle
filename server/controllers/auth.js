require("dotenv").config();

const mongoose = require("mongoose");
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//     if (error) {
//       console.log(error);
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };

// const login = async (req, res) => {
//   const user = await User.findOne({ userName: req.body.userName });
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       const accessToken = generateAccessToken({
//         userName: user.userName,
//         id: user._id,
//       });
//       const refreshToken = jwt.sign(
//         { userName: user.userName, id: user._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "2h" }
//       );
//       res.json({
//         result: user,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       });
//     } else {
//       res.send("Not allowed");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const register = async (req, res) => {
//   const {
//     userType,
//     firstName,
//     lastName,
//     userName,
//     mail,
//     password,
//     confirmPassword,
//   } = req.body;
//   const existingEmail = await User.findOne({ mail });
//   const existingUserName = await User.findOne({ userName });

//   if (existingEmail || existingUserName) {
//     return res.status(400).json({ message: "User already exists." });
//   }
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords don't match" });
//   }

//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const user = new User({
//     userType,
//     firstName,
//     lastName,
//     userName,
//     mail,
//     password: hashedPassword,
//   });

//   try {
//     const newUser = await user.save();
//     const accessToken = generateAccessToken({
//       userName: user.userName,
//       id: user._id,
//     });
//     const refreshToken = jwt.sign(
//       { userName: user.userName, id: user._id },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "2h" }
//     );
//     res.status(201).json({
//       result: newUser,
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const generateAccessToken = (userData) => {
//   return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "25m",
//   });
// };

// module.exports = { authenticateToken, register };


//edit

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Giả sử bạn có model User

// Controller cho đăng ký (Register)
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    user = new User({ firstName, lastName, email, password: hashedPassword, userName });

    // Lưu người dùng mới vào DB
    await user.save();

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

    // Trả về thông tin người dùng và token
    res.status(201).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller cho đăng nhập (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng qua email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // So sánh mật khẩu
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

    // Trả về thông tin người dùng và token
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
