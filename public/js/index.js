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

socket.on('newLocationMessage',function(message){
  //console.log("location":location);
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">MY CURRENT LOCATION</a>');

  li.text(`${message.from}: `,);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})
var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation)
  {
    return alert('geolocation not supported');
  }

  navigator.geolocation.getCurrentPosition(function (position){
  socket.emit('createLocationMessage',{
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  });

  },function(){
    alert('unable to fetch location');
  })
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
