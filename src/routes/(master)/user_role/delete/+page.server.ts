import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getUserRoleById = async () => {
		if (!locals.user) throw redirect(302, '/user_role'); // Prevent guest users from accessing this page directly.
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('user_roles').getOne(id);
	};

	return {
		userRole: await getUserRoleById(),
		user: locals.user
	};
};
