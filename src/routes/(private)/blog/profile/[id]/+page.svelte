<script lang="ts">
	import { getUser, updateUser } from '$lib/auth/profile.remote.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import { Card } from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const userProfile = $derived(await getUser());
	let firstName = $derived(userProfile?.firstName);
	let lastName = $derived(userProfile?.lastName);
	let email = $derived(userProfile?.email);
</script>

{#if userProfile}
	<div class="max-w-xl space-y-4">
		<Card>
			<CardHeader>Manager your profile</CardHeader>
			<CardContent>
				<form {...updateUser} class="space-y-4">
					<div class="space-y-2">
						<Label>Email</Label>
						<Input bind:value={email} name="email" />
					</div>
					<div class="space-y-2">
						<Label>First Name</Label>
						<Input bind:value={firstName} name="firstName" />
					</div>
					<div class="space-y-2">
						<Label>Last Name</Label>
						<Input bind:value={lastName} name="lastName" />
					</div>
					{#if updateUser.result?.error}
						<p class="text-sm text-destructive">{updateUser.result.error}</p>
					{/if}
					{#if updateUser.result?.success}
						<p class="text-sm text-green-600 dark:text-green-400">Updated successfully</p>
					{/if}
					<div>
						<Button type="submit">Update</Button>
					</div>
				</form>
			</CardContent>
		</Card>
		<Button variant="destructive" href="/auth/logout">Logout</Button>
	</div>
{/if}
