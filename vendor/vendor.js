'use strict';

const faker = require('faker');
const clientIo = require('socket.io-client');

let host = 'http://localhost:3000/caps';

const socket = clientIo.connect(host);

setInterval(()=>{
    let payload ={
        storeName: process.env.STORE_NAME,
        orderId: faker.datatype.number(),
        customerName: faker.name.findName(),
        address:  faker.address.direction()
    }
    socket.emit('pickup',payload);
    socket.emit('new_msg',payload);
},5000);

socket.on('delivering-it',payload=>{
    console.log('VENDOR: Thank you for delivering',payload.orderId);
})