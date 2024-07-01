<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	export let alt: string;
	export let src: string;

	function onError(e: Event & { currentTarget: EventTarget & Element }) {
		if (e.currentTarget) e.currentTarget.classList.add('hidden');
	}
</script>

<div class="w-9">
	<AspectRatio ratio={1 / 1} class="flex items-center justify-center">
		<img {src} {alt} class="w-full object-cover" on:error={onError} />
	</AspectRatio>
</div>
