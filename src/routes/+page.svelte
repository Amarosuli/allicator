<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Dialog from '$lib/components/ui/dialog';

	type RevisionNumber = {
		number: string;
		status: 'OPEN' | 'CLOSED';
	};
	let revisionNumber: RevisionNumber[] = [
		{ number: '90001975', status: 'OPEN' },
		{ number: '90001934', status: 'CLOSED' },
		{ number: '90003485', status: 'CLOSED' }
	];

	let esnValue = '';
</script>

<h1 class="w-full text-center text-2xl font-extrabold">Allicator</h1>

<div class="mx-auto mt-8 h-max w-1/3 space-y-2 border p-12">
	<Label for="esn">Engine Serial Number</Label>
	<form class="flex w-full max-w-sm items-center gap-2">
		<Input bind:value={esnValue} type="text" id="esn" placeholder="Engine Serial Number" />
		<!-- <Button type="submit">Search</Button> -->
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Search</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px] ">
				<Dialog.Header>
					<Dialog.Title>Choose Revision Number</Dialog.Title>
					<Dialog.Description
						>Choose active revision number of project ESN {esnValue}.</Dialog.Description
					>
				</Dialog.Header>
				<ScrollArea class="h-40 w-full rounded-md border">
					<div class="p-4">
						<!-- <h4 class="mb-4 text-sm font-medium leading-none">Revision Number</h4> -->
						{#each revisionNumber as rn}
							<div class="text-sm">
								<a href="/calculation/{rn.number}" class="hover:underline"
									>{rn.number} - {rn.status}</a
								>
							</div>
							<Separator class="my-2" />
						{/each}
					</div>
				</ScrollArea>
				<!-- <Dialog.Footer>
					<Button type="submit">Submit</Button>
				</Dialog.Footer> -->
			</Dialog.Content>
		</Dialog.Root>
	</form>
	<p class="text-xs text-muted-foreground">Enter ESN (Engine Serial Number).</p>
</div>
