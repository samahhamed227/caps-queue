'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';
const connectionToCaps = io.connect(host);

const store = '1-206-flowers';

connectionToCaps.emit('join', store);

connectionToCaps.emit('get_all', store)

connectionToCaps.on('message', msg => {
    console.log('messages: ', msg.payload.payload)
    connectionToCaps.emit('received', msg.payload.payload)
})

connectionToCaps.on('delivered', payload => {

    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
});

connectionToCaps.on("delivered", msg => {
    connectionToCaps.emit('received', msg)
})

module.exports = connectionToCaps