<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { getInitial } from '$lib/utils';

	export let alt: string;
	export let src: string;
	export let fallback: string;
</script>

<Avatar.Root class="h-9 w-9">
	<Avatar.Image {src} {alt} />
	<Avatar.Fallback class="uppercase">{getInitial(fallback)}</Avatar.Fallback>
</Avatar.Root>
