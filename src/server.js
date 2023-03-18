import http from "http";
import express from "express";
import SocketIo from "socket.io";
import Server from "socket.io";
import { instrument } from "@socket.io/admin-ui";

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
  socket.on("join_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
});

///////////
////채팅////
///////////

// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;

//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });
//   return publicRooms;
// }

// function countRooms(roomName) {
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection", (socket) => {
//   //   wsServer.socketJoin("announcement");
//   socket["nickname"] = "Anon";

//   socket.onAny((event) => {
//     console.log(wsServer.sockets.adapter);
//     console.log(`Socket Event:${event}`);
//   });
//   // 입장
//   socket.on("enter_room", (roomName, done) => {
//     socket.join(roomName);
//     done();
//     socket.to(roomName).emit("welcome", socket.nickname, countRooms(roomName));
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   // 종료
//   socket.on("disconnecting", () => {
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit("bye", socket.nickname, countRooms(room) - 1)
//     );
//   });

//   socket.on("disconnect", () => {
//     wsServer.sockets.emit("room_change", publicRooms());
//   });

//   socket.on("new_message", (msg, room, done) => {
//     socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
//     done();
//   });

//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });

httpServer.listen(8000, handleListen);
// app.listen(8000, handleListen);
