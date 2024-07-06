import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/calculation_template'); // Prevent guest users from accessing this page directly.

	const getCalculationTemplateById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('calculation_tmp').getOne(id, {expand: 'engine_model_id, module_id'});
	};

	return {
		calculationTemplate: await getCalculationTemplateById(),
		user: locals.user
	};
};
