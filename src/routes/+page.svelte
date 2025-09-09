<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="min-h-[60vh] grid place-items-center">
	<div class="max-w-md w-full">
		<div class="bg-card border rounded-xl shadow-sm p-8 text-center space-y-6">
			<h1 class="text-2xl font-semibold">Welcome</h1>
			<p class="text-sm text-muted-foreground">Sign in to continue to your dashboard.</p>
			<div>
				<Button href="/auth/login" class="w-full">Login to the site</Button>
			</div>
		</div>
	</div>
</div>
