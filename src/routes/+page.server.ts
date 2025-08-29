import { getOrCreateUserProfile } from '$lib/auth/index.js';
import { db } from '$lib/db/index.js';
import { profileTable } from '$lib/db/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/gel-core/expressions';
import { zfd } from 'zod-form-data';

export const load = async ({ locals }) => {
	const userProfile = await getOrCreateUserProfile(locals);
	return {
		userProfile
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const userProfile = await getOrCreateUserProfile(locals);
		if (!userProfile) {
			error(401, 'You are not logged in');
		}

		const schema = zfd.formData({
			firstName: zfd.text(),
			lastName: zfd.text(),
			email: zfd.text()
		});

		const { data } = schema.safeParse(await request.formData());

		if (!data) {
			error(400, 'Invalid data');
		}

		await db
			.update(profileTable)
			.set({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email
			})
			.where(eq(profileTable.id, userProfile.id));

		return {
			success: true
		};
	}
};
