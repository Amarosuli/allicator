<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { getFirstPath } from '$lib/helpers.js';
	import { LoaderCircle } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	const { engineFamilies } = data;
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

	$: selectedFamily = $formData.family_id
		? {
				label: engineFamilies.find(({ value }) => value == $formData.family_id)?.label,
				value: $formData.family_id
			}
		: undefined;
</script>

<svelte:head>
	<title>Engine Models - Create</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">New Engine Model</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Model Name</Label>
					<Input {...attrs} bind:value={$formData.name} type="text" placeholder="Engine Model Name" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="description">
				<Control let:attrs>
					<Label>Model Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Engine Model Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="family_id">
				<Control let:attrs>
					<Label>Engine Family</Label>
					<Select.Root
						selected={selectedFamily}
						onSelectedChange={(v) => {
							v && ($formData.family_id = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Family" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each engineFamilies as family}
									<Select.Item value={family.value} label={family.label}>{family.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.family_id} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Button class="mt-4" type="submit" disabled={$delayed ? true : false}>
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin " /> Saving...
				{:else}
					Save
				{/if}
			</Button>
			{#if $message}
				<p class="mt-2 bg-destructive p-2 text-center text-xs font-semibold text-destructive-foreground">{$message}</p>
			{/if}
			<Button class="mt-4" variant="outline" href={basePath}>Back</Button>
		</form>
	</div>
</div>
