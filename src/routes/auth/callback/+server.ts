import { createProfile } from '$lib/auth/index.js';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/blog'; // default

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			await createProfile(event.locals);
			const target = next.startsWith('/') ? next : '/blog';
			throw redirect(303, target);
		}
	}

	throw redirect(303, '/auth/auth-code-error');
};
