<script>
	import '../app.css';
</script>

<div class="container mx-auto flex w-full flex-col space-y-8">
	<div class="flex h-20 items-center justify-between border-b px-4">
		<div>Allicator</div>
		<div class="flex space-x-4">
			<a href="/login">Login</a>
			<a href="/">Home</a>
		</div>
	</div>
	<slot></slot>
	<div class="flex w-full items-center justify-center space-x-4 pt-12"></div>
</div>

<style></style>
