import type { CalculationTemplate } from '$lib/CostumTypes';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	let id = url.pathname.split('/').pop();
	const getCalculationTemplateById = async () => {
		let calculationTemplate: CalculationTemplate;
		if (!id) return;
		try {
			calculationTemplate = await locals.pb.collection('calculation_tmp').getOne(id);
		} catch (error: any) {
			console.log({ status: 'failed', code: error.response.code, message: error.response.message });
			return;
		}
		return calculationTemplate;
	};

	return {
		calculationTemplate: await getCalculationTemplateById()
	};
};
