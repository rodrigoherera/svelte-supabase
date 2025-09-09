import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { session } = await locals.safeGetSession();
	const redirectTo = url.searchParams.get('redirectTo') ?? '/blog';

	if (session) {
		const target =
			redirectTo.startsWith('/') && !redirectTo.startsWith('/auth/login') ? redirectTo : '/blog';

		throw redirect(303, target);
	}

	return { redirectTo };
};
