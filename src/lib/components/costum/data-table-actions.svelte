<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	import type { AuthModel } from 'pocketbase';

	export let id: string;
	export let user: AuthModel | undefined;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item
				on:click={async () => {
					try {
						await navigator.clipboard.writeText(id);
						toast.success('The Data ID was copied to your clipboard!');
					} catch (_) {
						toast.error('Failed to copy ID');
					}
				}}>Copy Data ID</DropdownMenu.Item>
		</DropdownMenu.Group>
		{#if user}
			<DropdownMenu.Separator />
			<DropdownMenu.Item href="/engine_family/edit?id={id}">Edit</DropdownMenu.Item>
			<DropdownMenu.Item href="/engine_family/delete?id={id}">Delete</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
