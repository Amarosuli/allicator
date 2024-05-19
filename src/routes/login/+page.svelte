<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let employeeId = '';
	let password = '';
</script>

<div class="flex w-full flex-col items-center justify-center gap-2">
	<div class="text-2xl font-extrabold">Login Page</div>

	<div class="w-1/3 space-y-2 p-8">
		<Label class="font-semibold" for="employeeId">Employee ID</Label>
		<Input
			bind:value={employeeId}
			type="text"
			id="employeeId"
			name="employeeId"
			placeholder="Insert Your ID"
		/>
		<Label class="font-semibold" for="password">Password</Label>
		<Input
			bind:value={password}
			type="text"
			id="password"
			name="password"
			autocomplete="false"
			placeholder="Insert Your Password"
		/>
	</div>
</div>
