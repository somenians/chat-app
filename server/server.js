// import ioClient from 'socket.io-client';
// const ENDPOINT = 'http://localhost:3000';

// const socket = ioClient(ENDPOINT);

// export const io = socket;

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server({
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', (socket) => {
	// socket.emit('eventFromServer', 'Hello, World 👋');
	console.log('recieved msg');
	socket.on('message', (msg) => {
		io.emit('message', msg);
	});
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

io.listen(port);
