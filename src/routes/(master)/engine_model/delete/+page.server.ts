import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getEngineModelById = async () => {
		if (!locals.user) throw redirect(302, '/engine_model'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id)
			return await locals.pb.collection('engine_models').getOne(id, {
				expand: 'family_id'
			});
	};

	return {
		engineModel: await getEngineModelById(),
		user: locals.user
	};
};
