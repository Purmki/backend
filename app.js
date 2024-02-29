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
  },
});

const userScores = {}
// Set up Socket.IO connection event
io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.quizId);
    // console.log({data})
    // console.log(`User ${socket.id} joined room: ${data.quizId}`);
    // console.log("A user connected:", socket.id);
    io.emit("user-joined", data.user);
  });


  // Listen for messages from clients
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Broadcast the message to all connected clients in the same room
    io.to(data.room).emit("message", data);
  });

  socket.on("userScore", (score, room) => {
    console.log(score);
    userScores[socket.id] = score;
  

    // Broadcast the score only to users in the same room
    io.to(room).emit("score", userScores);
  });

  socket.on("gameStart",(room)=>{
    console.log(room)
    io.to(room).emit("gameStart")
  })

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userScores[socket.id];

    // Broadcast the updated scores only to users in the same room
    io.to(socket.id).emit("score", userScores);

    // Leave the room upon disconnection
    socket.leave(socket.id);
  });
});

// Expose the server and io instances for external use if needed
module.exports = { app, server, io };
