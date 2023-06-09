const WebSocket = require('ws');

const fs = require('fs');
const util = require('util');
const { json } = require('express');

const readFile = util.promisify(fs.readFile)
const filePath = 'nepesseg.txt'

const kerNepessegSzam = async () => await readFile(filePath, 'utf8')

const server = new WebSocket.Server({ port: 8080 });

const sendObject = (object) => JSON.stringify(object)

server.on('connection', (socket) => {
    socket.send(sendObject({ username: "joseph", pfpURL: "none" }))

    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Send a response message
        socket.send(`You sent: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    let i = 1
    setInterval(async () => {
        socket.send(await kerNepessegSzam())
    }, 1000);

});

console.log('WebSocket server running on port 8080');
