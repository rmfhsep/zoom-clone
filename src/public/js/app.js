const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSlect = document.getElementById("cameras");
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    console.log(devices);
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      camerasSlect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMeida() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    console.log(myStream);
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}

getCameras();
getMeida();

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);

///////////
////채팅////
///////////

// const welcome = document.getElementById("welcome");
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// room.hidden = true;

// let roomName = "";
// function addMessage(message) {
//   const ul = room.querySelector("ul");
//   const li = document.createElement("li");
//   li.innerText = message;
//   ul.appendChild(li);
// }

// function handleMessageSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#msg input");
//   const value = input.value;
//   socket.emit("new_message", input.value, roomName, () => {
//     addMessage(`You: ${value}`);
//   });
//   input.value = "";
// }

// function showRoom(msg) {
//   welcome.hidden = true;
//   room.hidden = false;
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName}`;

//   const msgForm = room.querySelector("#msg");
//   msgForm.addEventListener("submit", handleMessageSubmit);
//   const nameForm = room.querySelector("#name");
//   msgForm.addEventListener("submit", handleNicknameSubmit);
// }

// function handleNicknameSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#name input");
//   const value = input.value;
//   socket.emit("nickname", value);
// }

// function handleRoomSubmit(event) {
//   event.preventDefault();
//   const input = form.querySelector("input");

//   socket.emit("enter_room", input.value, showRoom);
//   roomName = input.value;
//   input.value = "";
// }

// form.addEventListener("submit", handleRoomSubmit);

// socket.on("welcome", (user, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${user} 가 접속했습니다.`);
// });

// socket.on("bye", (left, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${left} 나갔습니다.`);
// });

// socket.on("new_message", (msg) => addMessage(msg));

// socket.on("room_change", (rooms) => {
//   const roomList = welcome.querySelector("ul");

//   if (rooms.length === 0) {
//     roomList.innerHTML = "";
//     return;
//   }

//   rooms.forEach((room) => {
//     const li = document.createElement("li");
//     li.innerText = room;
//     roomList.append(li);
//   });
// });
