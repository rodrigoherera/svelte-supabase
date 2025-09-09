<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
    import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { getPostByID, remove, updateBlog } from '../blog.remote';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = await getPostByID(data.id);
</script>

<div class="max-w-xl">
    <Card>
        <CardHeader>Manage your post</CardHeader>
        <CardContent class="space-y-4">
            <form {...updateBlog} class="space-y-4">
                <div class="space-y-2">
                    <Label>Title</Label>
                    <Input bind:value={post.title} name="title" />
                </div>
                <div class="space-y-2">
                    <Label>Description</Label>
                    <Input bind:value={post.description} name="description" />
                </div>
                <div class="space-y-2">
                    <Label>Tags</Label>
                    <Input bind:value={post.tags} name="tags" />
                </div>
                <div class="flex items-center gap-2">
                    <Button type="submit" name="id" value={post.id}>Update</Button>
                </div>
            </form>
            <form {...remove}>
                <Button variant="destructive" type="submit" name="id" value={post.id}>Delete</Button>
            </form>
        </CardContent>
    </Card>
</div>
