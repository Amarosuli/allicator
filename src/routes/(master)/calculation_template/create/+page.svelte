<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { getFirstPath } from '$lib/helpers.js';
	import { LoaderCircle } from 'lucide-svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	const { engineModels, engineModules } = data;
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

	$: selectedEngineModel = $formData.engine_model_id
		? {
				label: engineModels.find(({ value }) => value == $formData.engine_model_id)?.label,
				value: $formData.engine_model_id
			}
		: undefined;

	$: selectedEngineModule = $formData.module_id
		? {
				label: engineModules.find(({ value }) => value == $formData.module_id)?.label,
				value: $formData.module_id
			}
		: undefined;
</script>
<SuperDebug data={$formData} />
<svelte:head>
	<title>Calculation Template - Create</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">New Calculation Template</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" enctype="multipart/form-data" use:enhance>
			<Field {form} name="title">
				<Control let:attrs>
					<Label>Title</Label>
					<Input {...attrs} bind:value={$formData.title} type="text" placeholder="Customer Name" />
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
			<Field {form} name="formula">
				<Control let:attrs>
					<Label>Formula</Label>
					<Input {...attrs} bind:value={$formData.formula} type="text" placeholder="Customer Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="engine_model_id">
				<Control let:attrs>
					<Label>Engine Model</Label>
					<Select.Root
						selected={selectedEngineModel}
						onSelectedChange={(v) => {
							v && ($formData.engine_model_id = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Engine Model" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each engineModels as model}
									<Select.Item value={model.value} label={model.label}>{model.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.engine_model_id} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="module_id">
				<Control let:attrs>
					<Label>Engine Module</Label>
					<Select.Root
						selected={selectedEngineModule}
						onSelectedChange={(v) => {
							v && ($formData.module_id = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Engine Module" />
						</Select.Trigger>
						<Select.Content class="max-h-60 overflow-y-auto">
							<Select.Group>
								{#each engineModules as module}
									<Select.Item value={module.value} label={module.label}>{module.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.engine_model_id} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="constanta">
				<Control let:attrs>
					<Label>Constanta</Label>
					<Input {...attrs} bind:value={$formData.constanta} type="text" placeholder="Customer Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="subtask">
				<Control let:attrs>
					<Label>Subtask</Label>
					<Input {...attrs} bind:value={$formData.subtask} type="text" placeholder="Customer Description" />
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
