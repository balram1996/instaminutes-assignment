const express = require("express");
const http = require("http");
const path = require("path")
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")))
const PORT = 3000 || process.env.PORT;

//run when client connect
io.on("connection" , socket=>{
    console.log("new web socket connection")
})
server.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
});
