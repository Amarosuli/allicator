<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { LoaderCircle } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { pb } from '$lib/pocketbaseClient.js';
	import { z } from 'zod';

	import type { EngineList } from '$lib/CostumTypes.js';

	let isLoading: boolean = false;
	let engineId: string | undefined = undefined;
	let esnInput: string = '';
	let isOpen: boolean = false;

	const findEngineByEsn = async () => {
		let esn = z.string().trim().min(1, 'Cannot Empty').safeParse(esnInput);
		if (!esn.success) return;
		isLoading = true;

		let engineData: EngineList = {} as EngineList;
		try {
			engineData = await pb.collection('engine_list').getFirstListItem(`esn="${esn.data}"`);
		} catch (_) {}

		if (engineData) {
			engineId = engineData.id;
		} else {
			engineId = undefined;
		}

		isOpen = true;
		isLoading = false;
	};

	const getRevisionByEsn = async () => {
		return await pb.collection('project_list').getFullList({
			filter: `engine_id="${engineId}"`
		});
	};

	const masterDataLinks = [
		{ href: '/calculation_template', label: 'Calculation Template', isDisabled: false },
		{ href: '/engine_model', label: 'Engine Model', isDisabled: false },
		{ href: '/engine_family', label: 'Engine Family', isDisabled: false },
		{ href: '/engine_module', label: 'Engine Module', isDisabled: false },
		{ href: '/project_type', label: 'Project Type', isDisabled: false },
		{ href: '/unit', label: 'Unit', isDisabled: false },
		{ href: '/user', label: 'User', isDisabled: false },
		{ href: '/user_role', label: 'User Role', isDisabled: false }
	];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
	<div class="w-full md:w-2/3">
		<h1 class="w-full text-center text-2xl font-extrabold">New Measurement</h1>

		<div class="mx-auto mt-8 h-2/3 w-full space-y-2 border p-8 shadow">
			<Label for="esn">Engine Serial Number</Label>
			<div class="flex w-full max-w-sm items-center gap-2">
				<Input
					bind:value={esnInput}
					on:keypress={({ key }) => {
						if (key === 'Enter' && !isOpen) findEngineByEsn();
					}}
					type="text"
					id="esn"
					name="esn"
					placeholder="Engine Serial Number"
					autocomplete="off" />
				<Button on:click={findEngineByEsn} disabled={isLoading ? true : false}>
					{#if isLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin " /> Searching...
					{:else}
						Search
					{/if}
				</Button>
				<Dialog.Root bind:open={isOpen}>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title class="font-semibold">{engineId ? 'Choose Revision Number' : 'Not Found'}</Dialog.Title>
							<Dialog.Description class="text-xs">{engineId ? `Choose active revision number of project ESN ${esnInput}.` : ''}</Dialog.Description>
						</Dialog.Header>
						{#if engineId === undefined}
							<div class="bg-destructive p-4 font-semibold text-destructive-foreground">
								Oops, data for 'ESN {esnInput}' not found! <br /> Please contact EPC to ensure the ESN you are looking for is registered.
							</div>
						{:else}
							<ScrollArea class="h-40 w-full rounded-md border p-4">
								{#await getRevisionByEsn()}
									<div class="flex h-32 w-full items-center justify-center gap-2 bg-muted font-semibold"><LoaderCircle class="mr-2 h-6 w-6 animate-spin " /> Loading...</div>
								{:then projectList}
									{#each projectList as project}
										<div class="flex w-full items-center justify-between gap-2 text-sm">
											<a href="/calculation/{project.revision_number}" class="p-2 font-semibold underline-offset-2 hover:underline">
												{project.revision_number}
											</a>
											<p class="w-16 p-1 px-2 {project.status === 'OPEN' ? 'bg-green-300' : 'bg-slate-200'} text-xs font-extrabold text-slate-800">{project.status}</p>
										</div>
										<Separator />
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

	<div class="w-full md:w-2/3">
		<h1 class="w-full text-center text-2xl font-extrabold">Project Manager</h1>

		<div class="mx-auto mt-8 grid h-2/3 w-full grid-cols-3 gap-2 border p-8 shadow">
			<div class="flex w-full flex-col space-y-2">
				<Button class="w-fit" href="/engine_list">Engine List</Button>
			</div>
			<div class="flex w-full flex-col space-y-2">
				<Button class="w-fit" href="/project_list">Project List</Button>
			</div>
			<div class="flex w-fit flex-col space-y-2">
				<Button class="w-fit" href="/customer">Customer List</Button>
			</div>
			<p class="col-span-3 w-full text-xs text-muted-foreground">Group of all menu for manage project data.</p>
		</div>
	</div>

	<div class="w-full md:w-2/3">
		<h1 class="w-full text-center text-2xl font-extrabold">Master Data</h1>

		<div class="mx-auto mt-8 flex h-2/3 w-full flex-wrap items-start justify-start gap-2 border p-8 shadow">
			{#each masterDataLinks as link}
				{#if link.isDisabled}
					<Button class="w-fit" disabled>{link.label}</Button>
				{:else}
					<Button class="w-fit" href={link.href}>{link.label}</Button>
				{/if}
			{/each}
			<p class="col-span-3 w-full text-xs text-muted-foreground">Group of all menu for manage master data.</p>
		</div>
	</div>
</div>

<div class="mx-auto mt-8 h-max w-full space-y-2 border p-12">Table data of any engine, any module that measured recently</div>
