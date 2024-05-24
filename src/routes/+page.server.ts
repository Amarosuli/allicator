import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// is it good to preload all revision data here ?
	const getAllEngine = async () => {
		return locals.pb.collection('engine_list').getFullList();
	};
	return {
		allEngine: await getAllEngine()
	};
};
