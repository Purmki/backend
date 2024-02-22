const express = require("express");
const usersRouter = require("./routes/users.routes");
const quizzesRouter = require("./routes/quizzes.routes");
const groupsRouter = require("./routes/groups.routes");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/quizzes", quizzesRouter);
app.use("/api/v1/groups", groupsRouter);

// Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: "*",
    // credentials: true,
  },
});

// Set up Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for messages from clients
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Expose the server and io instances for external use if needed
module.exports = { app, server, io };
