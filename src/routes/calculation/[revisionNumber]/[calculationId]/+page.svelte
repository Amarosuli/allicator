<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createAllicator } from '$lib/helpers';

	export let data;
	const { calculationTemplate } = data;
	const { createInput, variable, calculate, formula, constanta } = createAllicator(calculationTemplate);
	const { inputVariables, inputStatement, livePreview } = createInput();
</script>

<div class="flex justify-between">
	<div class="w-full space-y-4">
		<div class="flex w-max flex-col rounded-lg border p-8">
			<p class="font-bold">{calculationTemplate?.title}</p>
			<p class="text-sm">{calculationTemplate?.description}</p>
			<div class="flex space-x-2 pt-2">
				<p class="font-semibold">Parameter:</p>
				{#each variable as input}
					<p class="font-bold">{input}</p>
				{/each}
			</div>
		</div>

		<div class="flex w-max flex-col rounded-lg border p-8">
			<p class="pb-2 font-bold">Input Measurement</p>
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

		<div class="flex w-max flex-col gap-2 rounded-lg border p-8">
			<p class="font-bold">Press to get result</p>
			<Button>Calculate</Button>
		</div>
	</div>
	<div class="flex h-max w-full gap-2">
		<div class="flex w-max flex-col gap-2 rounded-lg border p-8">
			<p class="font-bold">Constanta</p>
			<p>{constanta ? constanta : '-'}</p>
		</div>
		<div class="flex w-max flex-col gap-2 rounded-lg border p-8">
			<p class="font-bold">Live Result</p>
			<p>{formula}</p>
			<p>{$livePreview.statement} = {$livePreview.result}</p>
		</div>
	</div>
</div>
