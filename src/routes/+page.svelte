<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { RecordModel } from 'pocketbase';
	import { pb } from '$lib/pocketbaseClient.js';
	import { z } from 'zod';

	let esnInput = '';
	let result: RecordModel | undefined;
	let isOpen: boolean = false;

	export let data;
	const { allEngine } = data;

	const findEsn = () => {
		let esnInputTrimmed = z.string().trim().min(1, 'Cannot Empty').safeParse(esnInput);
		if (!esnInputTrimmed.success) return;

		result = allEngine.find(({ esn }) => esn === esnInputTrimmed.data);
		isOpen = true;
	};

	const getRevisionByEsn = async () => {
		return await pb.collection('project_list').getFullList({
			filter: 'engine_id="' + result?.id + '"'
		});
	};
</script>

<div class="flex w-full justify-center gap-8">
	<div class="md:w-1/3">
		<h1 class="w-full text-center text-2xl font-extrabold">New Measurement</h1>

		<div class="mx-auto mt-8 h-max w-full space-y-2 border p-12">
			<Label for="esn">Engine Serial Number</Label>
			<div class="flex w-full max-w-sm items-center gap-2">
				<Input
					bind:value={esnInput}
					on:keypress={({ key }) => {
						if (key === 'Enter' && !isOpen) findEsn();
					}}
					type="text"
					id="esn"
					name="esn"
					placeholder="Engine Serial Number"
					autocomplete="off" />
				<Button on:click={findEsn}>Search</Button>
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title class="font-semibold">Choose Revision Number</Dialog.Title>
							<Dialog.Description class="text-xs">Choose active revision number of project ESN {esnInput}.</Dialog.Description>
						</Dialog.Header>
						{#if result === undefined}
							<div class="bg-yellow-200 p-4 font-extrabold text-slate-800">
								Ups, Data for ESN {esnInput} Not Found!. <br /> Contact EPC to make sure the ESN already registered.
							</div>
						{:else}
							<ScrollArea class="h-40 w-full rounded-md border p-4">
								{#await getRevisionByEsn()}
									<div class="bg-yellow-200 font-extrabold text-slate-800">Loading...</div>
								{:then projectList}
									{#each projectList as project}
										<div class="flex w-full items-center justify-between gap-2 text-sm">
											<a href="/calculation/{project.revision_number}" class="p-2 font-semibold underline-offset-2 hover:underline">
												{project.revision_number}
											</a>
											<p class="w-16 p-1 px-2 {project.status === 'OPEN' ? 'bg-green-300' : 'bg-slate-200'} text-xs font-extrabold">{project.status}</p>
										</div>
										<Separator class="" />
									{/each}
								{/await}
							</ScrollArea>
						{/if}
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<p class="text-xs text-muted-foreground">Enter ESN (Engine Serial Number).</p>
		</div>
	</div>
</div>

<div class="mx-auto mt-8 h-max w-full space-y-2 border p-12">Table data of any engine, any module that measured recently</div>
