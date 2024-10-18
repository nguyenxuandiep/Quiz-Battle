require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); 
const { Server } = require("socket.io"); 

const app = express();

// Import middleware và routes
const {
  authenticateToken,
  regenerateAccessToken,
} = require("./middleware/auth");

const userRouter = require("./routes/user");
const quizRouter = require("./routes/quiz");
const gameRouter = require("./routes/game");
const playerResultRouter = require("./routes/playerResult");
const leaderboardRouter = require("./routes/leaderboard");

// Kết nối MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

// Sử dụng Express middlewares
app.use(express.json({ limit: '5mb' }));
app.use(cors());
app.use(authenticateToken);

// Các route
app.use("/api/users", userRouter);
app.use("/api/quizes", quizRouter);
app.use("/api/games", gameRouter);
app.use("/api/playerResults", playerResultRouter);
app.use("/api/leaderboard", leaderboardRouter);

// Khởi tạo server HTTP
const server = http.createServer(app);

// Khởi tạo Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả các nguồn kết nối (hoặc thay thế bằng frontend domain)
    methods: ["GET", "POST"]
  }
});

// Lắng nghe các kết nối từ client qua Socket.IO
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Lắng nghe các sự kiện từ client, ví dụ như 'join', 'message', v.v.
  socket.on("join", (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

// Lắng nghe cổng từ file .env
server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
