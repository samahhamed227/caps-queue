'use strict';
require ('dotenv').config();
const uuid = require('uuid').v4;
const PORT=process.env.PORT||3030;
const io = require('socket.io');
const queue = {
    message:{}
}

io.on('connection', (socket)=>{
    console.log(`welcome to the hub  ,${socket.id}`);
    })
const caps = io.of('./caps');
caps.on('connection', (socket)=>{
console.log(`welcome  out namespace,${socket.id}`);

socket.on('join', (room)=>{
    console.log(`${socket.id} is joining ${room}`);

    socket.join(room)
})

socket.on('get all messeage',(message)=>
{
console.log(`caps here all message${message}`);
if(!queue.messag[message.event]){
    queue.messag[message.event]={};
}
if(!queue.messag[message.event][message.clientId]){
    queue.messag[message.event][message.clientId]={};

}
if(queue.messag[message.event][message.clientId]){
socket.emit('receive',{
    payload:queue.messag[message.event][message.clientId]
});
}

})
socket.on('recieve', (messeage)=>{

    queue.messag[message.event][message.clientId]={}; //remove the message in the queue
})
//driver=>vendore pickup 
socket.on('pickedup',message=>{
    let messageid =uuid();
    if(!queue.message.pickedup){
        queue.message.pickedup = {};
    }
    if(!queue.message.pickedup['driver']){
        queue.message.pickedup["driver"] = {};
    }
queue.message.pickedup["driver"][messageid] = message.payload;
    logevent('pickedup',message)
    caps.in('driver').emit('pickedup',{messageid,payload:message.payload});

})

socket.on('in-transit', message =>{
    caps.emit('in-transit',message);
})
socket.on('delivered', message =>{
const messageid = uuid();
if(!queue.message.delivered){
    queue.message.delivered = {};
}
if(!queue.message.delivered[message.payload.payload.orderstore]){
    queue.message.delivered[message.payload.payload.orderstore]= {};
}
queue.message.pickedup["delivered"][messageid] = message.payload;
logevent('delivered',message)
caps.emit('delivered',{message});

})

})

function logevent (event, payload) {
const timestamp = new Date().toString();
console.log('event',event,timestamp,payload);
}


















//