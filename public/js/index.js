var socket=io();

socket.on('connect',function(){
  console.log("connected to server");
})



socket.on('disconnect',function (){
  console.log("server disconnected");
})

socket.on('newMessage', function(message){
  console.log("message:",message);

  var li=jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li);
})

socket.emit('createMessage',{
  from : "frank",
  text :"hii!"
},function (data){
  console.log("got it!",data);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

socket.emit('createMessage',{
  from : "user",
  text : jQuery('[name=message]').val()
},function(){

})
})
