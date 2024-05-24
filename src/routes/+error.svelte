<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';

	console.log($page.error);
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<img class="w-80" src="/ooops.png" alt="ooops" />
		<p class="pt-4 text-2xl font-extrabold uppercase text-red-600">{$page.status} - {$page.error?.message}</p>
		<p class="pb-4 text-xl font-semibold text-slate-800">The page you are looking for doesn't exist</p>
		<Button variant="default" href="/">Back to Home</Button>
	</div>
</div>
