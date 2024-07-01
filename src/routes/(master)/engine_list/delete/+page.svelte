<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { getFirstPath } from '$lib/helpers.js';
	import { Separator } from '$lib/components/ui/separator';
	import { redirect } from '@sveltejs/kit';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbaseClient';

	export let data;
	const { engineList } = data;
	const basePath = getFirstPath($page.url.pathname);

	let password: string;
	let id: string | null = $page.url.searchParams.get('id');

	$: isLoading = false;
	$: username = $page.data.user.username;

	async function confirmationCheck() {
		isLoading = true;
		if (!id) throw redirect(308, basePath); // redirect if id undefined
		try {
			await pb.collection('users').authWithPassword(username, password);
			await deleteData(id);
		} catch (error) {
			toast.error('Wrong password!');
			isLoading = false;
			return;
		}
		isLoading = false;
		goto(basePath);
	}

	async function deleteData(id: string) {
		try {
			await pb.collection('engine_list').delete(id);
			toast.success('Delete success');
		} catch (error) {
			toast.error('Failed to delete data');
		}
	}
</script>

<svelte:head>
	<title>Engine List - Delete</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<h1 class="w-80 pb-4 text-center text-2xl font-extrabold">Are you sure you want to delete this data?</h1>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 text-sm md:w-1/3">
		<Separator />
		<div class="flex w-full items-center justify-between">
			<p class="w-full pl-2 text-start font-bold">Engine Serial Number</p>
			<p class="w-full pr-2 text-right">{engineList?.esn}</p>
		</div>
		<Separator />
		<div class="flex w-full items-center justify-between">
			<p class="w-full pl-2 text-start font-bold">Engine Note</p>
			<p class="w-full pr-2 text-right">{engineList?.note}</p>
		</div>
	</div>

	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<div class="flex w-full flex-col space-y-2">
			<form class="flex w-full flex-col space-y-2" on:submit|preventDefault={async () => await confirmationCheck()}>
				<Label class="">Type Your Password</Label>
				<Input type="password" autocomplete="off" bind:value={password} />
				<Button variant="destructive" type="submit" disabled={isLoading ? true : false}>
					{#if isLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Deleting...
					{:else}
						Delete
					{/if}
				</Button>
			</form>
			<Button variant="outline" href={basePath}>Cancel</Button>
		</div>
	</div>
</div>
