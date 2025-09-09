import { query, form } from '$app/server';
import { db } from '$lib/db';
import { postTable } from '$lib/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zfd } from 'zod-form-data';
import z from 'zod';

export const getPosts = query(async () => {
	const posts = await db.query.postTable.findMany();
	if (!posts) {
		throw error(404, 'No posts found');
	}
	return posts;
});

export const getPostByID = query(z.string(), async (id) => {
	const post = await db.query.postTable.findFirst({
		where: eq(postTable.id, id)
	});

	if (!post) {
		throw error(404, 'No post found');
	}

	return post;
});

export const createPost = form(async (formData) => {
	const schema = zfd.formData({
		title: zfd.text(),
		description: zfd.text(),
		tags: zfd.text().nullable()
	});

	const { data } = schema.safeParse(formData);

	if (!data) {
		return {
			error: 'Invalid data'
		};
	}

	await db.insert(postTable).values({
		title: data.title,
		description: data.description,
		tags: data.tags
	});

	redirect(303, '/blog');
});

export const remove = form(async (formData) => {
	const schema = zfd.formData({
		id: zfd.text()
	});

	const { data } = schema.safeParse(formData);

	if (!data) {
		return {
			error: 'Invalid data'
		};
	}

	await db.delete(postTable).where(eq(postTable.id, data.id));

	redirect(303, '/blog');
});

export const updateBlog = form(async (formData) => {
	const schema = zfd.formData({
		id: zfd.text(),
		title: zfd.text(),
		description: zfd.text(),
		tags: zfd.text()
	});

	const { data } = schema.safeParse(formData);

	if (!data) {
		return {
			error: 'Invalid data'
		};
	}

	await db
		.update(postTable)
		.set({
			title: data.title,
			description: data.description,
			tags: data.tags
		})
		.where(eq(postTable.id, data.id));

	redirect(303, '/blog');
});
