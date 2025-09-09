<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
</script>

<div class="min-h-[60vh] grid place-items-center">
	<Card class="w-full max-w-sm">
		<CardHeader>Login to the site!</CardHeader>
		<CardContent class="space-y-3">
			<Button href="/auth/login/github" class="w-full">Sign in with Github</Button>
			<Button href="/auth/login/google" variant="secondary" class="w-full">Sign in with Google</Button>
		</CardContent>
	</Card>
</div>
