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

<div class="flex w-full justify-center gap-8">
	<div class="w-1/3">
		<h1 class="w-full text-center text-2xl font-extrabold">New Measurement</h1>

		<div class="mx-auto mt-8 h-max w-full space-y-2 border p-12">
			<Label for="esn">Engine Serial Number</Label>
			<div class="flex w-full max-w-sm items-center gap-2">
				<Input bind:value={esnValue} type="text" id="esn" name="esn" placeholder="Engine Serial Number" />
				<Dialog.Root>
					<Dialog.Trigger type="submit" class={buttonVariants({ variant: 'default' })}>Search</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[425px] ">
						<Dialog.Header>
							<Dialog.Title class="font-semibold">Choose Revision Number</Dialog.Title>
							<Dialog.Description class="text-xs">Choose active revision number of project ESN {esnValue}.</Dialog.Description>
						</Dialog.Header>
						<ScrollArea class="h-40 w-full rounded-md border">
							<div class="p-4">
								<!-- <h4 class="mb-4 text-sm font-medium leading-none">Revision Number</h4> -->
								{#each revisionNumber as rn}
									<div class="{rn.status === 'OPEN' ? 'bg-green-300' : 'bg-slate-200'} py-2 text-sm">
										<a href="/calculation/{rn.number}" class="p-2 underline-offset-2 hover:underline">
											{rn.number} - {rn.status}
										</a>
									</div>
									<Separator class="my-2" />
								{/each}
							</div>
						</ScrollArea>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<p class="text-xs text-muted-foreground">Enter ESN (Engine Serial Number).</p>
		</div>
	</div>
</div>

<div class="mx-auto mt-8 h-max w-full space-y-2 border p-12">Table data of any engine, any module that measured recently</div>
