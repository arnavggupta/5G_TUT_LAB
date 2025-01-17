// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express and create an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Handle client connections
io.on('connection', (socket) => {
    // Get the client's IP address
    const clientIp = socket.request.connection.remoteAddress;
    console.log(`New client connected from: ${clientIp}`);
    
    // Send a welcome message to the client
    socket.emit('message', 'Welcome to the server!');
    
    // Handle incoming messages from the client
    socket.on('message', (data) => {
        console.log(`Received from client (${clientIp}): ${data}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Client from ${clientIp} disconnected`);
    });
});

// Serve the static files (if any) and start the server
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
