<script lang="ts">
	import '../app.css';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import { LoaderCircle, Moon, Sun } from 'lucide-svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	function getInitial(fullname: string) {
		let initial = fullname
			.split(' ')
			.map((word) => word.charAt(0))
			.slice(0, 2)
			.join('');
		return initial;
	}

	export let data;
	$: user = data.user;

	let loadingPage: boolean = false;

	beforeNavigate(() => (loadingPage = true));
	afterNavigate(() => (loadingPage = false));
</script>

{#if loadingPage}
	<div transition:fade={{ duration: 200 }} class="fixed z-[1000] flex h-screen w-full flex-col items-center justify-center bg-slate-700/70 text-2xl font-semibold">
		<LoaderCircle class="animate-spin text-yellow-400" />
		<p class="pt-2 text-sm text-yellow-300">Loading</p>
	</div>
{/if}

<Toaster />
<ModeWatcher />

<div class="container mx-auto flex w-full flex-col space-y-8">
	<div class="flex h-20 items-center justify-between border-b px-4">
		<div>
			<a href="/">
				<!-- icon here -->
				<h1 class="font-extrabold">Allicator</h1>
			</a>
		</div>
		<div class="flex items-center gap-2">
			{#if user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]} class="relative h-9 w-9 rounded-full">
							<Avatar.Root class="h-9 w-9">
								<Avatar.Image src={data.avatar} alt={user.username} />
								<Avatar.Fallback class="uppercase">{getInitial(user.name)}</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{user.name}</p>
								<p class="text-xs leading-none text-muted-foreground">{user.username} - {data.role?.name}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								Profile
								<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<form action="/logout" method="post">
							<DropdownMenu.Item>
								<button type="submit" class="w-full text-start">Logout</button>
								<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						</form>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button variant="link" href="/login" class={$page.url.pathname === '/login' ? 'hidden' : ''}>Login</Button>
			{/if}
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="h-4 w-4 rotate-0 scale-100 text-yellow-600 transition-all duration-100 dark:-rotate-90 dark:scale-0" />
				<Moon class="absolute h-4 w-4 rotate-90 scale-0 text-yellow-400 transition-all duration-100 dark:rotate-0 dark:scale-100" />
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</div>
	<slot></slot>
	<div class="flex w-full items-center justify-center space-x-4 pt-12"></div>
</div>
