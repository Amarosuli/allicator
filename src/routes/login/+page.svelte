<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { FieldErrors, Control, Field, Label } from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const form = superForm(data.form);
	const { form: formData, message, enhance } = form;
</script>

<div class="flex w-full flex-col items-center justify-center">
	<div class="text-2xl font-extrabold">Login Page</div>
	<div class="flex w-full flex-col items-center justify-center space-y-3 p-8 md:w-1/3">
		<form class="flex w-full max-w-80 flex-col" method="post" use:enhance>
			<Field {form} name="employeeId">
				<Control let:attrs>
					<Label>Employee ID</Label>
					<Input {...attrs} bind:value={$formData.employeeId} type="text" placeholder="Your Employee ID" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Field {form} name="password">
				<Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} bind:value={$formData.password} type="password" placeholder="Your Password" />
				</Control>
				<FieldErrors class="text-xs italic" />
			</Field>
			<Button class="mt-4" type="submit">Let's go!</Button>
			{#if $message}
				<p class="mt-2 bg-red-200 p-2 text-center text-xs font-semibold">{$message}</p>
			{/if}
		</form>
		<div class="flex w-full flex-col items-center justify-center space-y-2 p-8">
			<div class="flex w-full justify-between">
				<p class="w-full text-ellipsis text-center text-sm">Share your thoughts!</p>
			</div>
			<Button class="w-fit text-xs" variant="outline">Feedback & Improvement</Button>
		</div>
	</div>
</div>
