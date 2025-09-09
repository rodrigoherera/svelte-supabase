import { form, getRequestEvent, query } from '$app/server';
import { db } from '$lib/db';
import { profileTable } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zfd } from 'zod-form-data';
import { getAuthUser } from '.';

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	const user = await getAuthUser(locals);

	if (!user) {
		return null;
	}

	const profile = await db.query.profileTable.findFirst({
		where: eq(profileTable.id, user.id)
	});

	if (!profile) {
		throw error(404, 'Profile not found');
	}

	return profile;
});

export const updateUser = form(async (formData) => {
	const user = await getUser();

	if (!user) {
		return {
			error: 'No user session found'
		};
	}

	const schema = zfd.formData({
		firstName: zfd.text(),
		lastName: zfd.text(),
		email: zfd.text()
	});

	const { data } = schema.safeParse(formData);

	if (!data) {
		return {
			error: 'Invalid data'
		};
	}

	await db
		.update(profileTable)
		.set({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email
		})
		.where(eq(profileTable.id, user.id));

	return {
		success: true
	};
});
