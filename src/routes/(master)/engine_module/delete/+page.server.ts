import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getEngineModuleById = async () => {
		if (!locals.user) throw redirect(302, '/engine_module'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id)
			return await locals.pb.collection('engine_modules').getOne(id, {
				expand: 'parent_module'
			});
	};

	return {
		engineModule: await getEngineModuleById(),
		user: locals.user
	};
};
