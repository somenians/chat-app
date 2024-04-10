import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';
import type { ViteDevServer } from 'vite';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);
		io.on('connection', (socket) => {
			let username = `User ${Math.round(Math.random() * 999999)}`;
			socket.emit('name', username);

			socket.on('message', (message) => {
				io.emit('message', {
					from: username,
					message: message,
					time: new Date().toLocaleString()
				});
			});
		});

		console.log('SocketIO injected');
	}
};

export default defineConfig({
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	},
	plugins: [sveltekit(), webSocketServer],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
