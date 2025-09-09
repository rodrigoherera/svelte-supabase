<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:boundary>
	<!-- Public layout wrapper -->
	<div class="flex min-h-screen flex-col">
		<header class="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/40">
			<div class="container mx-auto flex items-center justify-between px-4 py-4">
				<a href="/" class="text-lg font-semibold">Svelte Supabase</a>
			</div>
		</header>
		<main class="container mx-auto flex-1 px-4 py-8">
			{@render children()}
		</main>
		<footer class="border-t py-6 text-center text-xs text-muted-foreground">
			<p>Built with SvelteKit + shadcn + Tailwind</p>
		</footer>
	</div>
	{#snippet pending()}
		<p class="text-sm text-muted-foreground">Loading…</p>
	{/snippet}
</svelte:boundary>
