<script lang="ts">
	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { Loader2Icon, LoaderCircle, X } from 'lucide-svelte';
	import { getFirstPath } from '$lib/helpers.js';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import InputFile from '$lib/components/costum/input-file.svelte';
	import { getFileUrl } from '$lib/pocketbaseClient.js';
	import { onMount } from 'svelte';

	export let data;
	let isLogoLoading: boolean = false;

	const form = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				goto(basePath);
			}
		}
	});
	const { form: formData, delayed, message, enhance } = form;

	const file = fileProxy(formData, 'logo');
	const basePath = getFirstPath($page.url.pathname);
	$: data.customer && formData.set({ ...data.customer, logo: undefined });

	async function setImageInput(collectionId: string, id: string, name: string) {
		const url = getFileUrl(collectionId, id, name);
		const response = await fetch(url);
		const blob = await response.blob();
		const fileRaw = new File([blob], name, { type: blob.type });
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(fileRaw);
		const fileList = dataTransfer.files;
		file.set(fileList);
	}

	onMount(async () => {
		if (data.customer && data.customer.logo) {
			isLogoLoading = true;
			setImageInput(data.customer.collectionId, data.customer.id, data.customer.logo);
			isLogoLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Customer - Edit</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">Edit Customer</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" enctype="multipart/form-data" use:enhance>
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Customer Name</Label>
					<Input {...attrs} bind:value={$formData.name} type="text" placeholder="Customer Name" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="description">
				<Control let:attrs>
					<Label>Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Customer Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="logo">
				<Control let:attrs>
					<Label class="flex gap-2"
						>Logo
						{#if isLogoLoading}
							<Loader2Icon class="h-4 w-4 animate-spin" />
						{/if}
					</Label>
					<InputFile {...attrs} accept="image/png, image/jpeg" {file} />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="code_IATA">
				<Control let:attrs>
					<Label>Code IATA</Label>
					<Input {...attrs} bind:value={$formData.code_IATA} type="text" placeholder="Code IATA" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="code_ICAO">
				<Control let:attrs>
					<Label>Code ICAO</Label>
					<Input {...attrs} bind:value={$formData.code_ICAO} type="text" placeholder="Code ICAO" />
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
