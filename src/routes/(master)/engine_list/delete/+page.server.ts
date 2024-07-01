import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getEngineListById = async () => {
		if (!locals.user) throw redirect(302, '/engine_list'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('engine_list').getOne(id);
	};

	return {
		engineList: await getEngineListById(),
		user: locals.user
	};
};
