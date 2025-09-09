<script lang="ts">
	import type { LayoutProps } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:boundary>
	<header class="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/40">
		<div class="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
			<p class="text-sm text-muted-foreground">Hi {data.session?.user.email}</p>
			<nav class="flex items-center gap-2">
				<Button variant="outline" href={`/blog/profile/${data.session?.user.id}`}>Profile</Button>
				<Button variant="destructive" href="/auth/logout">Logout</Button>
			</nav>
		</div>
	</header>
	<main class="container mx-auto px-4 py-8">
		{@render children()}
	</main>
</svelte:boundary>
