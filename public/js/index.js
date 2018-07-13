var socket=io();

socket.on('connect',function(){
  console.log("connected to server");
})



socket.on('disconnect',function (){
  console.log("server disconnected");
})

socket.on('newMessage', function(message){
  console.log("message:",message);
})
