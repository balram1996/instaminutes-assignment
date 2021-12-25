const express = require("express");
const http = require("http");
const path = require("path")
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require("./utils/messages");

//set static folder
app.use(express.static(path.join(__dirname, "public")))

const adminName = "Chat App"

//run when client connect
io.on("connection" , socket=>{
    socket.on("joinRoom" , ({username,room})=>{
     
        //welcome current user
    socket.emit('message' ,formatMessage(adminName,"welcome to chatapp"));

    //Broadcast when a user connects
    socket.broadcast.emit("message" ,formatMessage(adminName,"A user has joined the chat"));

    });

    //listen chat messages
    socket.on("chatMessage" , msg=>{
        io.emit("message" ,formatMessage("USER",msg))
       console.log(msg)
    });

    //Runs when client disconnects
    socket.on("disconnect" , ()=>{
        io.emit("message" , formatMessage(adminName,"A user has left the chat"))
    });

});

const PORT = 3000 || process.env.PORT;
server.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
});
