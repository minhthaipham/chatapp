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

  // socket.on("newUser", (userId) => {
  //   if (!users.includes(userId)) {
  //     users.push({
  //       userId: userId,
  //       socketId: socket.id,
  //     });
  //   }
  //   io.emit("getUsers", users);
  // });
  // socket.on("sendMessage", (data) => {
  //   console.log(data);
  //   const { receiveId } = data;
  //   const user = users.find((user) => user.userId === receiveId);
  //   if (user) {
  //     io.to(user.socketId).emit("receiveMessage", data);
  //   }
  //   // io.to(user.socketId).emit("receiveMessage", data);
  // });
  // socket.on("typing-start", ({ idUser }) => {
  //   const user = users.find((user) => user.userId === idUser);
  //   if (user) {
  //     console.log("typing-start", user);
  //     // io.to(user.socketId).emit("typing-start-server", user.userId);
  //     socket.broadcast.emit("typing-start-server", user.userId);
  //   }
  // });
  // socket.on("typing-end", ({ idUser }) => {
  //   const user = users.find((user) => user.userId === idUser);
  //   if (user) {
  //     console.log("typing-end", user);
  //     io.to(user.socketId).emit("typing-end-server", user.userId);
  //   }
  // });
  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  //   users = users.filter((user) => user.socketId !== socket.id);
  //   io.emit("getUsers", users);
  // });
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
