<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Badge } from '$lib/components/ui/badge';
	import { page } from '$app/stores';
	import type { CalculationTemplate, EngineModule } from '$lib/CostumTypes.js';

	export let data;
	let { modules, projectDetail, calculationData, calculationTemplate } = data;
	const basePath = $page.url.pathname;

	function getModuleParent(data: any) {
		return data.filter((module: any) => !module.parent_module.length) as EngineModule[];
	}
	function getModuleSub(data: any, parentId: any) {
		return data.filter((module: any) => module.parent_module === parentId) as EngineModule[];
	}
	function getCalculationTemplate(id: string) {
		return calculationTemplate.data?.filter((calculationTmp: any) => calculationTmp.module_id === id) as CalculationTemplate[];
	}
</script>

<svelte:head>
	<title>Project ESN {projectDetail?.data?.esn}</title>
</svelte:head>

<div class="flex w-full flex-col items-center justify-center space-y-2 text-center">
	<h1 class="text-center text-2xl font-extrabold">Project Page</h1>
	{#if projectDetail.status === 'success' && projectDetail.data}
		<div class="border border-green-600 p-4">
			<p class="text-sm font-semibold">ESN {projectDetail.data.esn} | {projectDetail.data.model}</p>
			<p class="text-sm font-semibold">Revision Number: {projectDetail.data.revision_number}</p>
		</div>
	{:else}
		<div class="border border-red-600 p-4">
			<p class="text-sm font-semibold text-red-600">{projectDetail.message}</p>
		</div>
	{/if}
	{#if calculationData.status === 'failed'}
		<div class="border border-red-600 p-4">
			<p class="text-sm font-semibold text-red-600">{calculationData.message}</p>
		</div>
	{/if}
	{#if calculationTemplate.status === 'failed'}
		<div class="border border-red-600 p-4">
			<p class="text-sm font-semibold text-red-600">{calculationTemplate.message}</p>
		</div>
	{/if}
</div>

<div class="mx-auto flex w-fit flex-col items-stretch justify-center gap-3 p-2 md:w-fit md:flex-row">
	{#each getModuleParent(modules.data) as module}
		<div class="overflow-hidden rounded-md">
			<div class="w-full text-ellipsis border bg-slate-100 px-4 py-4 text-center text-sm font-extrabold uppercase text-slate-700 xl:text-center">{module.name} {module.description}</div>
			<div class="flex w-full rounded-b-md border-x border-b p-2 pb-4 shadow">
				<Accordion.Root class="w-full px-2">
					{#each getModuleSub(modules.data, module.id) as sub}
						<Accordion.Item value={sub.name}>
							<Accordion.Trigger>
								<p class="pr-4 text-start text-sm">{sub.name} {sub.description}</p>
							</Accordion.Trigger>
							<Accordion.Content>
								{#each getCalculationTemplate(sub.id) as tmp}
									<HoverCard.Root>
										<HoverCard.Trigger href="{basePath}/{tmp.id}" rel="noreferrer noopener" class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black">
											<Badge>{tmp.title}</Badge>
										</HoverCard.Trigger>
										<HoverCard.Content class="w-80">
											<div class="flex justify-between space-x-4">
												<div class="space-y-1">
													<h4 class="text-sm font-bold">{tmp.title}</h4>
													<p class="text-sm">{tmp.description}</p>
													<p class="text-sm">{tmp.subtask}</p>
												</div>
											</div>
										</HoverCard.Content>
									</HoverCard.Root>
								{:else}
									<p class="text-xs">No Reference</p>
								{/each}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		</div>
	{/each}
</div>
