require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const register = async (req, res) => {
  const {
    userType,
    firstName,
    lastName,
    userName,
    mail,
    password,
    confirmPassword,
  } = req.body;
  const existingEmail = await User.findOne({ mail });
  const existingUserName = await User.findOne({ userName });

  if (existingEmail || existingUserName) {
    return res.status(400).json({ message: "User already exists." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    userType,
    firstName,
    lastName,
    userName,
    mail,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    const accessToken = generateAccessToken({
      userName: user.userName,
      id: user._id,
    });
    const refreshToken = jwt.sign(
      { userName: user.userName, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    res.status(201).json({
      result: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "25m",
  });
};

module.exports = { authenticateToken, register };