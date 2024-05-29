<script lang="ts">
	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { LoaderCircle } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	export let data;
	const form = superForm(data.form);
	const { form: formData, delayed, message, enhance } = form;

	$: data.engineFamily && formData.set(data.engineFamily);
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">Edit Engine Family</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="name">
				<Control let:attrs>
					<Label>Family Name</Label>
					<Input {...attrs} bind:value={$formData.name} type="text" placeholder="Engine Family Name" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="description">
				<Control let:attrs>
					<Label>Family Description</Label>
					<Input {...attrs} bind:value={$formData.description} type="text" placeholder="Engine Family Description" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Button class="mt-4" type="submit" disabled={$delayed ? true : false}>
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> Updating...
				{:else}
					Update
				{/if}
			</Button>
			{#if $message}
				<p class="mt-2 bg-destructive p-2 text-center text-xs font-semibold text-destructive-foreground">{$message}</p>
			{/if}
			<Button class="mt-4" variant="outline" href="/engine_family">Cancel</Button>
		</form>
	</div>
</div>
