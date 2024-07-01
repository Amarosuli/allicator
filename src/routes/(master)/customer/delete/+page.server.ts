import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/customer'); // Prevent guest users from accessing this page directly.

	const getCustomerById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('customers').getOne(id);
	};

	return {
		customer: await getCustomerById(),
		user: locals.user
	};
};
