import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getEngineFamilyById = async () => {
		if (!locals.user) throw redirect(302, '/engine_model'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('engine_families').getOne(id);
	};

	return {
		engineFamily: await getEngineFamilyById(),
		user: locals.user
	};
};
