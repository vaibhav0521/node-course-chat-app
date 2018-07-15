const path= require('path');
const publicPath=path.join(__dirname, '../public')

const http= require('http');
const socketIO=require('socket.io');
const express= require('express');
const port= process.env.PORT || 3000;
const {generateMessage}=require('./utils/message')

var app = express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.emit('newMessage',generateMessage('ADMIN',"Welcome to our chat app!"));

  socket.broadcast.emit('newMessage',generateMessage("ADMIN","new user joined"));
  socket.on('createMessage',(message,callback)=>{
    console.log("message:",message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback("this is from server");
  });

  socket.on('disconnect',()=>{
    console.log("user was disconnected")
  });
});





server.listen(port,()=>{
  //socket.emit('connection',message);
  console.log(`server is up on port ${port}`);
});
