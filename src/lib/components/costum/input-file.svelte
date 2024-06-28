<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from '$lib/components/ui/input';
	import { type Writable } from 'svelte/store';
	import { cn } from '$lib/utils.js';
	import { X } from 'lucide-svelte';

	interface HTMLInputAttributesExtended extends HTMLInputAttributes {
		file: Writable<FileList>;
	}
	type $$Props = HTMLInputAttributesExtended;
	type $$Events = InputEvents;

	let element: HTMLInputElement;
	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let file: Writable<FileList>;
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined;

	function reset() {
		element.value = '';
		file.set(undefined as unknown as FileList);
	}
</script>

<div class="relative">
	<input
		class={cn(
			'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		type="file"
		bind:value
		bind:files={$file}
		bind:this={element}
		{readonly}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:paste
		on:input
		on:wheel|passive
		{...$$restProps} />

	{#if $file[0]}
		<button class="absolute right-2 top-3 z-20" on:click|capture|preventDefault={reset}><X class="h-4 w-4" /></button>
	{/if}
</div>
