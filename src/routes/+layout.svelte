<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="container mx-auto flex w-full flex-col space-y-8">
	<div class="flex h-20 items-center justify-between border-b px-4">
		<div>
			<!-- icon here -->
			<h1 class="font-extrabold">Allicator</h1>
		</div>
		<div class="flex space-x-4">
			{#if $page.data.user}
				<p>{$page.data.role.name} {$page.data.user.name} <strong>{$page.data.user.username}</strong></p>
				<form action="/logout" method="post">
					<button type="submit">Logout</button>
				</form>
			{:else}
				<a href="/login">Login</a>
			{/if}

			<a href="/">Home</a>
		</div>
	</div>
	<slot></slot>
	<div class="flex w-full items-center justify-center space-x-4 pt-12"></div>
</div>
