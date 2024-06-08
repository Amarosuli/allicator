<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { LoaderCircle, X } from 'lucide-svelte';
	import { getFirstPath } from '$lib/helpers.js';
	import { superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	const { engineModules, engineModule } = data;
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
	$: engineModule && formData.set({ ...engineModule, parent_module: engineModule.expand?.parent_module.id });
	$: selectedParent = $formData.parent_module
		? {
				label: engineModules.find(({ value }) => value == $formData.parent_module)?.label,
				value: $formData.parent_module
			}
		: {
				label: undefined,
				value: ''
			};
</script>

<svelte:head>
	<title>Engine Modules - Edit</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">New Engine Module</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Module Name</Label>
					<Input {...attrs} bind:value={$formData.name} type="text" placeholder="Engine Module Name" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="description">
				<Control let:attrs>
					<Label>Module Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Engine Module Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="parent_module" class="relative">
				<Control let:attrs>
					<Label>Parent Module</Label>
					<Select.Root
						selected={selectedParent}
						onSelectedChange={(v) => {
							v && ($formData.parent_module = v.value);
						}}>
						<Select.Trigger>
							<Select.Value class="w-full text-start" placeholder="Select Parent" />
						</Select.Trigger>
						{#if $formData.parent_module}
							<Button size="icon" variant="outline" class="absolute -right-12 top-6" on:click={() => ($formData.parent_module = undefined)}><X class="h-4 w-4" /></Button>
						{/if}
						<Select.Content class="max-h-60 overflow-y-auto">
							<Select.Group>
								{#each engineModules as module}
									<Select.Item value={module.value} label={module.label}>{module.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.parent_module} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Button class="mt-4" type="submit" disabled={$delayed ? true : false}>
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin " /> Updating...
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
