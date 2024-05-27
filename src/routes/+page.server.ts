import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, setHeaders }) => {
	setHeaders({ 'cache-control': 'max-age=600' });
	// is it good to preload all revision data here ?
	const getAllEngine = async () => {
		return await locals.pb.collection('engine_list').getFullList();
	};
	return {
		allEngine: await getAllEngine()
	};
};
