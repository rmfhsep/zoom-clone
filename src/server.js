import http from "http";
import express from "express";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on 8000");

const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 5000);
  });
});

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "unKnown";

//   console.log("Connected to Browser ✅");

//   socket.on("close", () => {
//     console.log("Disconnected from the Browser");
//   });

//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname} : ${message.payload.toString()}`)
//         );
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });

httpServer.listen(8000, handleListen);
// app.listen(8000, handleListen);
