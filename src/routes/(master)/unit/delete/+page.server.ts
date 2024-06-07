import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getUnitById = async () => {
		if (!locals.user) throw redirect(302, '/unit'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('units').getOne(id);
	};

	return {
		unit: await getUnitById(),
		user: locals.user
	};
};
