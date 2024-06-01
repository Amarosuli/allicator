import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const getEngineFamily = async () => {
		return await locals.pb.collection('engine_families').getList(1, 6);
	};
	return {
		engineFamily: []
	};
};
