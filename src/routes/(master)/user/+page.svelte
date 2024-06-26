<script lang="ts">
	import DataTableCheckbox from '$lib/components/costum/data-table-checkbox.svelte';
	import DataTableAvatar from '$lib/components/costum/data-table-avatar.svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table';
	import { addHiddenColumns, addSelectedRows, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { ArrowDown, ArrowUp, ChevronDown, LoaderCircle } from 'lucide-svelte';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils.js';

	import { createPageFile } from '$lib/helpers.js';
	import { getFileUrl } from '$lib/pocketbaseClient.js';

	const { nextPage, prevPage, getState } = createPageFile().init('users', { expand: 'unit_id,role_id' });
	const { currentPage, items, totalPages, isLoading, hasPrevPage, hasNextPage } = getState();

	const table = createTable(items, {
		sort: addSortBy({ disableMultiSort: true }),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			accessor: 'id',
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: 'Username',
			accessor: 'username'
		}),
		table.column({
			header: 'Avatar',
			accessor: (item) => item,
			cell: ({ value }) => {
				return createRender(DataTableAvatar, { src: getFileUrl(value.collectionId, value.id, value.avatar), alt: value.name, fallback: value.name });
			}
		}),
		table.column({
			header: 'Email',
			accessor: (item) => {
				return `${item.username}@gmf-aeroasia.co.id`;
			}
		}),
		table.column({
			header: 'Name',
			accessor: 'name'
		}),
		table.column({
			header: 'Unit',
			accessor: (item) => {
				if (!item.expand) return '-';
				return item.expand.unit_id.name;
			}
		}),
		table.column({
			header: 'Role',
			accessor: (item) => {
				if (!item.expand) return '-';
				return item.expand.role_id.name;
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } = table.createViewModel(columns);
	const { selectedDataIds } = pluginStates.select;
	const { hiddenColumnIds } = pluginStates.hide;
	const { filterValue } = pluginStates.filter;
	const { sortKeys } = pluginStates.sort;

	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hideableCols = ['name', 'Email', 'username', 'Unit', 'Role'];
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<div class="relative mx-auto h-max w-full border p-4">
	{#if $isLoading}
		<div transition:fade={{ duration: 200 }} class="absolute inset-0 z-30 flex h-full flex-col items-center justify-center bg-slate-600/70">
			<LoaderCircle class="animate-spin text-yellow-400" />
			<p class="pt-2 text-sm text-yellow-300">Loading Data</p>
		</div>
	{/if}
	<div class="flex w-full items-center justify-between">
		<p class="w-full font-extrabold lg:text-xl">Users</p>
		<p class="block w-full text-ellipsis text-right text-xs">Go to pocketbase to manage data</p>
	</div>
	<div class="flex items-center gap-2 py-2">
		<Input class="max-w-sm" placeholder="Filter name..." type="text" bind:value={$filterValue} />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hideableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										{#if cell.id === 'name'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												{#if $sortKeys[0]?.id === cell.id && $sortKeys[0]?.order === 'asc'}
													<ArrowDown class="ml-2 h-4 w-4 text-foreground" />
												{:else if $sortKeys[0]?.id === cell.id && $sortKeys[0]?.order === 'desc'}
													<ArrowUp class="ml-2 h-4 w-4 text-foreground" />
												{:else}
													<div class="ml-2 h-4 w-4"></div>
												{/if}
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										{#if cell.id === 'name'}
											<div class="ml-4 capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			Page {$currentPage} of {$totalPages}
		</div>
		<Button variant="outline" size="sm" on:click={prevPage} disabled={!$hasPrevPage}>Previous</Button>
		<Button variant="outline" size="sm" disabled={!$hasNextPage} on:click={nextPage}>Next</Button>
	</div>
</div>
