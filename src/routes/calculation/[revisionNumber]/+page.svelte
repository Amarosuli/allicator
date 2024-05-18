<script lang="ts">
	import { page } from '$app/stores';
	import * as Accordion from '$lib/components/ui/accordion';
	const module = [
		{
			module: 'x20 - Fan Major Module',
			sub: [
				{ name: 'X21 Fan Booster', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'x22 Bearing 1 2', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'x23 Fan Frame', calculation: ['Measurement A', 'Measurement B'] }
			]
		},
		{
			module: 'x30 - Core Major Module',
			sub: [
				{ name: 'X31 Compressor Rotor', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'X32 Forward Case', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'X33 Rear Case', calculation: ['Measurement A', 'Measurement B'] }
			]
		},
		{
			module: 'x40 - Combustion Module',
			sub: [
				{ name: 'X41 Combustion Assy', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'X42 Combustion Chamber', calculation: ['Measurement A', 'Measurement B'] }
			]
		},
		{
			module: 'x50 - HPT Module',
			sub: [
				{ name: 'X51 HPT Nozzle', calculation: ['Measurement A', 'Measurement B'] },
				{ name: 'X52 HPT Rotor Module', calculation: ['Measurement A', 'Measurement B'] },
				{
					name: 'X53 HPT Shroud & Stg 1 LPT Nozzle',
					calculation: ['Measurement A', 'Measurement B']
				},
				{ name: 'X54 LPT Rotor Stator', calculation: ['Measurement A', 'Measurement B'] }
			]
		}
	];
</script>

<h1 class="mb-4 text-center text-2xl font-extrabold">
	Project Page - {$page.params.revisionNumber}
</h1>

<div class="grid w-full items-center justify-center gap-4">
	{#each module as m}
		<div class="w-max font-extrabold uppercase">{m.module}</div>
		<div class="flex w-[500px] border p-8">
			<div class="w-full space-y-2">
				<Accordion.Root>
					{#each m.sub as sub}
						<Accordion.Item value={sub.name}>
							<Accordion.Trigger>{sub.name}</Accordion.Trigger>
							{#each sub.calculation as c}
								<Accordion.Content>{c}.</Accordion.Content>
							{/each}
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		</div>
	{/each}
</div>
