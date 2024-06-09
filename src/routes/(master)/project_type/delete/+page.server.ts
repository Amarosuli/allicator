import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getProjectTypeById = async () => {
		if (!locals.user) throw redirect(302, '/project_type'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('project_type').getOne(id);
	};

	return {
		projectType: await getProjectTypeById(),
		user: locals.user
	};
};
