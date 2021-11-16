'use strict';
require (dotenv).config();
const storeid = 'driver' ;
const queue = new Queue(storeid);
const PORT =process.env.PORT ||3030 ;
const host ="http://localhost:3000";
const io = require('socket-io-client');
 class Queue {
constructor(id){
    this.id = id;
    this.socket=io.connect("http://localhost:3000");
}

 }

queue.socket('')