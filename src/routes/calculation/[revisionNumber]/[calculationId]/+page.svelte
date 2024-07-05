<script lang="ts">
	import { createAllicator } from '$lib/Allicator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { toast } from 'svelte-sonner';

	export let data;
	const { calculationTemplate } = data;
	const { createInput, variable, calculate, formula, constanta } = createAllicator(calculationTemplate);
	const { inputVariables, inputStatement, livePreview } = createInput();
</script>

<div class="md:flex max-sm:flex-col md:gap-4 max-sm:space-y-4 md:w-full">
	<div class="flex h-fit w-full  flex-col rounded-lg border p-8">
		<p class="font-bold">{calculationTemplate?.title}</p>
		<p class="text-sm text-muted-foreground">{calculationTemplate?.description}</p>
		<div class="pt-2">
			<p class="font-semibold">Parameter:</p>
			<p class="text-sm text-muted-foreground">
				{#each variable as input}
					{`${input}, `}
				{/each}
			</p>
		</div>
		<div class="pt-2">
			<p class="font-bold">Constanta</p>
			<p class="text-muted-foreground">{constanta ? constanta : '-'}</p>
		</div>
	</div>

	<div class="flex h-fit w-full flex-col rounded-lg border p-8">
		<p class="pb-1 font-bold">Input Measurement</p>
		<p class="text-xs text-muted-foreground pb-2">All input must be in inch</p>
		{#each Object.keys($inputVariables) as key}
			<div class="space-y-2 pt-2">
				<Label for={key} class="text-sm font-bold {Number.isNaN($inputVariables[key].value) ? 'text-destructive' : ''}">{key} (Inch)</Label>
				<Input
					class="border {$inputVariables[key].isDisabled ? 'bg-foreground text-background' : ''}"
					id={key}
					name={key}
					placeholder={key}
					on:change={(e) => {
						const value = parseFloat(e.currentTarget.value);
						$inputVariables[key].value = value;
					}}
					value={$inputVariables[key].value}
					disabled={$inputVariables[key].isDisabled}
					type="number" />
				{#if Number.isNaN($inputVariables[key].value)}
					<p class="text-xs font-medium italic text-destructive">NaN detected, please provide valid number</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="flex w-full h-fit flex-col gap-2 rounded-lg border p-8 bg-secondary">
		<p class="font-bold">Live Result</p>
		<p class="text-sm text-muted-foreground">{formula}</p>
		<p>{$livePreview.statement} = {$livePreview.result} inch</p>
	</div>

	<div class="flex w-full h-fit md:w-fit flex-col gap-2 rounded-lg border p-8">
		<!-- <p class="font-bold block text-nowrap">Save Result</p> -->
		<p class="text-xs text-muted-foreground">Save current result</p>
		<Button on:click={() => toast.info('Data Saved')}>Save Result</Button>
		<p class="text-xs text-muted-foreground">Show historical result</p>
		<Button on:click={() => toast.info('Data Saved')}>Show History</Button>
	</div>
</div>
