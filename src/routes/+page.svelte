<script lang="ts">
	import '$lib/app.css';
	// import { io } from '$lib/webSocketConnection.js';
	import { io } from 'socket.io-client';
	const socket = io('http://localhost:3000');

	import { onMount } from 'svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';

	let textfield = '';
	let username = '';

	let messages: any[] = [];
	socket.on('message', (data) => {
		messages = [...messages, data];
	});
	socket.on('name', (data) => {
		username = data;
	});

	function sendMessage() {
		const message = textfield.trim();
		if (!message) return;

		textfield = '';
		socket.emit('message', message);
	}

	export let layout = [15, 85];
	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}
</script>

<main>
	<div class="flex flex-col h-screen py-16 px-8 lg:py-24 lg:px-12">
		<h1 class="text-5xl pb-8">Chat App</h1>
		<div class="h-full w-full rounded-lg bg-secondary flex flex-col justify-between">
			<!-- <div class="">Messages</div> -->
			<div class="w-full overflow-scroll">
				{#each messages as message}
					<div class="px-4 py-3 my-4 w-fit">
						<span class="flex items-center space-between gap-4">
							<b>{message.from}</b>
							<i>{message.time}</i>
						</span>
						{message.message}
					</div>
				{/each}
			</div>
			<div class="jflex none">
				<form
					action="#"
					on:submit|preventDefault={sendMessage}
					class="flex flex-row space-x-8 py-4 px-4"
				>
					<input
						type="text"
						bind:value={textfield}
						placeholder="Type something..."
						class="bg-background border-none rounded-lg px-4 py-3 w-full"
					/>
					<button type="submit" class="border border-white rounded-lg px-4 py-3">Send</button>
				</form>
			</div>
		</div>
		<!-- <Resizable.PaneGroup
			direction="horizontal"
			class="max-h-screen max-w-screen rounded-lg"
			{onLayoutChange}
		>
			<Resizable.Pane defaultSize={layout[0]} minSize={10} maxSize={20}>
				<div class="flex h-full items-center justify-center rounded-lg bg-secondary">
					<div class="h-full overflow-auto p-6">Messages</div>
				</div>
			</Resizable.Pane>
			<Resizable.Handle class="bg-transparent w-3" />
			<Resizable.Pane defaultSize={layout[1]} collapsible maxSize={85}>
				<div class="flex h-full rounded-lg bg-secondary">
					<!-- <div class="h-full overflow-auto p-6">Messages</div> 
					{#each messages as message}
						<div class="px-4 py-3 my-4 w-fit">
							<span class="flex items-center space-between gap-4">
								<b>{message.from}</b>
								<i>{message.time}</i>
							</span>
							{message.message}
						</div>
					{/each}
					<div class="align-bottom">
						<form
							action="#"
							on:submit|preventDefault={sendMessage}
							class="flex flex-row space-x-8 object-bottom"
						>
							<input
								type="text"
								bind:value={textfield}
								placeholder="Type something..."
								class="bg-white border-none px-4 py-3 w-full"
							/>
							<button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3"
								>Send</button
							>
						</form>
					</div>
				</div>
			</Resizable.Pane>
			<Resizable.Handle class="bg-transparent w-3" />
			<Resizable.Pane defaultSize={layout[2]} minSize={3} maxSize={6}>
				<div class="flex h-full items-center justify-center rounded-lg bg-secondary"></div>
			</Resizable.Pane>
		</Resizable.PaneGroup> -->
	</div>
</main>

<!-- 

<div class="h-screen w-screen bg-zinc-800">
    <div class="h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col">
        <header
            class="px-6 py-4 border-b border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center justify-between"
        >
            <span class="font-bold text-xl">My Chat app</span>
            <span>{username}</span>
        </header>

        <div class="h-full w-full p-4">
            {#each messages as message}
                <div class="bg-zinc-300 rounded-xl rounded-tl-none px-4 py-3 my-4 w-fit">
                    <span class="flex items-center space-between gap-4">
                        <b>{message.from}</b>
                        <i>{message.time}</i>
                    </span>
                    {message.message}
                </div>
            {/each}
        </div>

        <form
            action="#"
            on:submit|preventDefault={sendMessage}
            class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
        >
            <input
                type="text"
                bind:value={textfield}
                placeholder="Type something..."
                class="bg-transparent border-none px-4 py-3 w-full"
            />
            <button type="submit" class="shrink-0 border border-white rounded-lg px-4 py-3">Send</button>
        </form>
    </div>
</div> -->
