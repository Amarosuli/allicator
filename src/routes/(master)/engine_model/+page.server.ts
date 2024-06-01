import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const getEngineModel = async () => {
		return await locals.pb.collection('engine_models').getList(1, 6, {
			expand: 'family_id'
		});
	};
	return {
		engineModel: []
	};
};
