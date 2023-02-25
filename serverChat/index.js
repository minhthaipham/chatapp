import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./router/auth.js";
import chat from "./router/chat.js";
import message from "./router/message.js";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
const SQL =
  "mongodb+srv://minhthai:thanhhoainun1@cluster0.mepn04s.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/chat", chat);
app.use("/message", message);

//socket

let users = [];
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("online", (userId) => {
    if (!users.includes(userId)) {
      users.push({
        userId: userId,
        socketId: socket.id,
      });
    }
    io.emit("getUsers", users);
  });

  //chat

  //message

  socket.on("join", (idChat) => {
    socket.join(idChat);
  });
  socket.on("sendMessage", ({ data, idChat }) => {
    socket.to(idChat).emit("receiveMessage", data);
  });

  socket.on("typing-start", (idChat) => {
    // socket.broadcast.emit("typing-start-server");
    socket.to(idChat).emit("typing-start-server");
  });

  socket.on("typing-end", (idChat) => {
    // socket.broadcast.emit("typing-end-server");
    socket.to(idChat).emit("typing-end-server");
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(SQL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    httpServer.listen(PORT, () =>
      console.log("Server is running on port 5000")
    );
  });
