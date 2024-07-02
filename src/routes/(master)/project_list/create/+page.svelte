<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';

	import { DateFormatter, parseDate, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { LoaderCircle, CalendarIcon } from 'lucide-svelte';
	import { getFirstPath } from '$lib/helpers.js';
	import { superForm } from 'sveltekit-superforms';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';

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

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	const projectStatus = [
		{ label: 'OPEN', value: 'OPEN' },
		{ label: 'CLOSED', value: 'CLOSED' }
	];

	let startedAt: DateValue | undefined;
	let finishedAt: DateValue | undefined;

	$: startedAt = $formData.started_at && $formData.started_at !== 'undefined' ? parseDate($formData.started_at) : undefined;
	$: finishedAt = $formData.finished_at && $formData.finished_at !== 'undefined' ? parseDate($formData.finished_at) : undefined;

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

			<Field {form} name="started_at">
				<Control let:attrs>
					<Label>Started at</Label>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button variant="outline" class={cn('w-[280px] justify-start text-left font-normal', !startedAt && 'text-muted-foreground')} builders={[builder]}>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{startedAt ? df.format(startedAt.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar
								onValueChange={(v) => {
									$formData.started_at = v ? v.toString() : '';
								}}
								initialFocus />
						</Popover.Content>
					</Popover.Root>
					<input type="text" hidden value={$formData.started_at} {...attrs} />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>

			<Field {form} name="finished_at">
				<Control let:attrs>
					<Label>Finished at</Label>
					<Popover.Root>
						<Popover.Trigger asChild let:builder>
							<Button variant="outline" class={cn('w-[280px] justify-start text-left font-normal', !finishedAt && 'text-muted-foreground')} builders={[builder]}>
								<CalendarIcon class="mr-2 h-4 w-4" />
								{finishedAt ? df.format(finishedAt.toDate(getLocalTimeZone())) : 'Pick a date'}
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar
								onValueChange={(v) => {
									$formData.finished_at = v ? v.toString() : '';
								}}
								initialFocus />
						</Popover.Content>
					</Popover.Root>
					<input type="text" hidden value={$formData.finished_at} {...attrs} />
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
