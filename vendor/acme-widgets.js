'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000/caps';
const connectionToCapsNameSpace = io.connect(host);


setInterval(() => {
    let newOrder = {
        type: 'Acme-Widget'
    };
    console.log('NewOrder "ACME-Widgets"');
    connectionToCapsNameSpace.emit('newOrder', newOrder);
}, 5000);