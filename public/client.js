const socket = io();

let typeArea = document.querySelector("#typearea");
let messageArea = document.querySelector(".message_area");

let name;
while (!name) {
  name = prompt("Enter your name");
}

typeArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  appendMessage(msg, "outgoing");
  typeArea.value = "";
  scrollToBottom();

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let classname = type;
  mainDiv.classList.add(classname, "message");

  let markup = `
  <h2>${msg.user}</h2>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});
