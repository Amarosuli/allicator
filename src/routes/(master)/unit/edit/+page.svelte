<script lang="ts">
	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { LoaderCircle } from 'lucide-svelte';
	import { getFirstPath } from '$lib/helpers.js';
	import { superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	const form = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				goto(basePath);
			}
		}
	});
	const { form: formData, delayed, message, enhance } = form;
	const basePath = getFirstPath($page.url.pathname);
	$: data.unit && formData.set(data.unit);
</script>

<svelte:head>
	<title>Employee Unit - Edit</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">Edit Unit</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Unit Name</Label>
					<Input {...attrs} bind:value={$formData.name} type="text" placeholder="Unit Name" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="description">
				<Control let:attrs>
					<Label>Unit Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Unit Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Button class="mt-4" type="submit" disabled={$delayed ? true : false}>
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Updating...
				{:else}
					Update
				{/if}
			</Button>
			{#if $message}
				<p class="mt-2 bg-destructive p-2 text-center text-xs font-semibold text-destructive-foreground">{$message}</p>
			{/if}
			<Button class="mt-4" variant="outline" href={basePath}>Cancel</Button>
		</form>
	</div>
</div>
