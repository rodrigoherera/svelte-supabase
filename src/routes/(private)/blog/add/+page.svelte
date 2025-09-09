<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
    import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { createPost } from '../blog.remote';
</script>

<div class="max-w-xl">
    <Card>
        <CardHeader>Add new post</CardHeader>
        <CardContent>
            <form {...createPost} class="space-y-4">
                <div class="space-y-2">
                    <Label>Title</Label>
                    <Input name="title" placeholder="My awesome post" />
                </div>
                <div class="space-y-2">
                    <Label>Description</Label>
                    <Input name="description" placeholder="Short description" />
                </div>
                <div class="space-y-2">
                    <Label>Tags</Label>
                    <Input name="tags" placeholder="svelte,web,notes" />
                </div>
                <div>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </CardContent>
    </Card>
</div>
