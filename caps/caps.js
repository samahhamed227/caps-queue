'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const uuid = require('uuid');
const faker = require('faker');

const caps = io.of('/caps');

const msgQueue={
    message:{}
}

caps.on('connection',(socket)=>{

    console.log('Connect To vendor:',socket.id);
    socket.on('pickup',(payload)=>{
        let pickUpPayload={
            event:'pickup',
            time: new Date().toLocaleDateString(),
            payload
        }
        console.log('Event',pickUpPayload);
        caps.emit('picking-up',payload);
    });

    console.log('Connect To in-transit:',socket.id);
    socket.on('in-transit',(payload)=>{
        let inTransitPayload = {
            event:'in-transit',
            time:new Date().toLocaleDateString(),
            payload
        }
        console.log('Event',inTransitPayload);
    });

    console.log('Connect To driver:',socket.id);
    socket.on('delivered',(payload)=>{
        let delevveredPayload = {
            event:'delivered',
            time:new Date().toLocaleDateString(),
            payload
        };
        console.log('Event',delevveredPayload);
        caps.emit('delivering-it',payload);
    });

    console.log("CONNECTED", socket.id)
    // when adding new message
    socket.on('new_msg', payload=> {
        console.log("adding a new message ....")
        const id =  faker.datatype.number();
        console.log("id ====> ", id)
        msgQueue.message[id] = payload;
        socket.emit('added', payload); // telling the message was added
        caps.emit('message_delivered', {id: id, payload:msgQueue.event ,payload: msgQueue.message[id]});
        console.log("after add msgQueue ========> ", msgQueue)
    });

    console.log('recieve handler');
    socket.on('received',msg =>{
        console.log('Massege is been recieved on queue and will be removed');
        delete msgQueue.message[msg.id];
        console.log('after deleting the message queue',msgQueue);
    });

    console.log('getting all the messages');
    socket.on('get_all',()=>{
        console.log('Get all the messages from the queue');
        Object.keys(msgQueue.message).forEach(id =>{
            socket.emit('message_delivered',{id:id,payload:msgQueue.event ,payload:msgQueue.message[id]})
        })
    })
})


module.exports=caps