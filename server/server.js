const path= require('path');
const publicPath=path.join(__dirname, '../public')

const http= require('http');
const socketIO=require('socket.io');
const express= require('express');
const port= process.env.PORT || 3000;

var app = express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.emit('newMessage',{
      from:"vaibhav",
      text:"hello!",
      createdAt:"1234"
  });


  socket.on('createMessage',(message)=>{
    console.log("message:",message);
  })

  socket.on('disconnect',()=>{
    console.log("user was disconnected")
  });
});





server.listen(port,()=>{
  //socket.emit('connection',message);
  console.log(`server is up on port ${port}`);
});
