<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="absolute inset-0 flex animate-pulse flex-col items-center justify-center bg-red-200">
		<img class="w-80" src="/ooops.png" alt="ooops" />
		<p class="text-md pt-4 font-extrabold uppercase text-red-500">{$page.status} - {$page.error?.message}</p>
		<p class="pb-4 text-sm font-semibold text-slate-800">The page you are looking for doesn't exist</p>
		<Button variant="default" href="/">Back to Home</Button>
	</div>
</div>
