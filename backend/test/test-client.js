import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    query: {
        projectId: '6775578a748befe7bf169cd3', // Replace with a valid ObjectId
    },
});

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
