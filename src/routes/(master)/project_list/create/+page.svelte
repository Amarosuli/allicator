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
	const { engineModels, customers, projectTypes, engineList } = data;
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

	const projectStatus = [
		{ label: 'OPEN', value: 'OPEN' },
		{ label: 'CLOSED', value: 'CLOSED' }
	];

	$: selectedEngineModel = $formData.engine_model_id
		? {
				label: engineModels.find(({ value }) => value == $formData.engine_model_id)?.label,
				value: $formData.engine_model_id
			}
		: undefined;

	$: selectedEngine = $formData.engine_id
		? {
				label: engineList.find(({ value }) => value == $formData.engine_id)?.label,
				value: $formData.engine_id
			}
		: undefined;

	$: selectedCustomer = $formData.customer
		? {
				label: customers.find(({ value }) => value == $formData.customer)?.label,
				value: $formData.customer
			}
		: undefined;

	$: selectedProjectType = $formData.project_type_id
		? {
				label: projectTypes.find(({ value }) => value == $formData.project_type_id)?.label,
				value: $formData.project_type_id
			}
		: undefined;

	$: selectedStatus = $formData.status
		? {
				label: projectStatus.find(({ value }) => value == $formData.status)?.label,
				value: $formData.status
			}
		: undefined;
</script>

<svelte:head>
	<title>Project - Create</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">New Project</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="revision_number">
				<Control let:attrs>
					<Label>Revision Number</Label>
					<Input {...attrs} bind:value={$formData.revision_number} type="text" placeholder="Revision Number" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="engine_config">
				<Control let:attrs>
					<Label>Engine Config</Label>
					<Input {...attrs} bind:value={$formData.engine_config} type="text" placeholder="Engine Config" />
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

			<Field {form} name="engine_id">
				<Control let:attrs>
					<Label>Engine Serial Number</Label>
					<Select.Root
						selected={selectedEngine}
						onSelectedChange={(v) => {
							v && ($formData.engine_id = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Engine Serial Number" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each engineList as engine}
									<Select.Item value={engine.value} label={engine.label}>{engine.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.engine_id} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="customer">
				<Control let:attrs>
					<Label>Customer</Label>
					<Select.Root
						selected={selectedCustomer}
						onSelectedChange={(v) => {
							v && ($formData.customer = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Customer" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each customers as customer}
									<Select.Item value={customer.value} label={customer.label}>{customer.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.customer} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="project_type_id">
				<Control let:attrs>
					<Label>Project Type</Label>
					<Select.Root
						selected={selectedProjectType}
						onSelectedChange={(v) => {
							v && ($formData.project_type_id = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Project Type" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each projectTypes as type}
									<Select.Item value={type.value} label={type.label}>{type.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.project_type_id} />
					</Select.Root>
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="description">
				<Control let:attrs>
					<Label>Project Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Project Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="status">
				<Control let:attrs>
					<Label>Project Status</Label>
					<Select.Root
						selected={selectedStatus}
						onSelectedChange={(v) => {
							v && ($formData.status = v.value);
						}}>
						<Select.Trigger>
							<Select.Value placeholder="Select Status" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each projectStatus as status}
									<Select.Item value={status.value} label={status.label}>{status.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input {...attrs} bind:value={$formData.status} />
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
