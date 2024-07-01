import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getProjectById = async () => {
		if (!locals.user) throw redirect(302, '/project_list'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id)
			return await locals.pb.collection('project_list').getOne(id, {
				expand: 'engine_model_id, engine_id, customer, project_type_id'
			});
	};

	return {
		project: await getProjectById(),
		user: locals.user
	};
};
