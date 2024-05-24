<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	function getInitial(fullname: string) {
		let initial = fullname
			.split(' ')
			.map((word) => word.charAt(0))
			.slice(0, 2)
			.join('');
		return initial;
	}
</script>

<div class="container mx-auto flex w-full flex-col space-y-8">
	<div class="flex h-20 items-center justify-between border-b px-4">
		<div>
			<a href="/">
				<!-- icon here -->
				<h1 class="font-extrabold">Allicator</h1>
			</a>
		</div>
		<div class="flex space-x-4">
			{#if $page.data.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
							<Avatar.Root class="h-8 w-8">
								<Avatar.Image src={$page.data.user.avatar} alt={$page.data.user.username} />
								<Avatar.Fallback class="uppercase">{getInitial($page.data.user.name)}</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{$page.data.user.name}</p>
								<p class="text-xs leading-none text-muted-foreground">{$page.data.user.username} - {$page.data.role.name}</p>
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
				<Button variant="link" href="/login">Login</Button>
			{/if}
		</div>
	</div>
	<slot></slot>
	<div class="flex w-full items-center justify-center space-x-4 pt-12"></div>
</div>
