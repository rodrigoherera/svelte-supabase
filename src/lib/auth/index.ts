import { db } from '$lib/db';
import { profileTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getAuthUser(locals: App.Locals) {
	const { user } = await locals.safeGetSession();
	return user ?? null;
}

export async function createProfile(locals: App.Locals) {
	const user = await getAuthUser(locals);
	if (!user) return null;

	await db.insert(profileTable).values({
		id: user.id,
		firstName: '',
		lastName: '',
		email: user.email ?? ''
	});

	const profile = await db.query.profileTable.findFirst({
		where: eq(profileTable.id, user.id)
	});

	return profile;
}
