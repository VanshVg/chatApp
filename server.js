const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("User Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
