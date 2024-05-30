import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const getEngineFamilyById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('engine_families').getOne(id);
	};

	return {
		engineFamily: await getEngineFamilyById(),
		user: locals.user
	};
};
