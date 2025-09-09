<script lang="ts">
	import { getUser } from '$lib/auth/profile.remote';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import { getPosts } from './blog.remote';

	const userProfile = $derived(await getUser());
	const posts = getPosts();
</script>

<div class="mb-6 flex items-center justify-between">
	<div>
		<h1 class="text-xl font-semibold">Posts</h1>
		<p class="text-sm text-muted-foreground">Manage and edit your posts</p>
	</div>
	<div class="flex items-center gap-2">
		<Button href="add">Create post</Button>
	</div>
</div>

<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each await posts as post (post.id)}
		<Card class="transition-shadow hover:shadow-md">
			<CardContent class="py-6">
				<h2 class="mb-1 truncate text-base font-medium">{post.title}</h2>
				<p class="overflow-hidden text-sm text-ellipsis text-muted-foreground">
					{post.description}
				</p>
				<div class="mt-4">
					<Button variant="secondary" href={`${post?.id}`}>Open</Button>
				</div>
			</CardContent>
		</Card>
	{/each}
	{#if (await posts)?.length === 0}
		<p class="text-sm text-muted-foreground">No posts yet.</p>
	{/if}
</div>
