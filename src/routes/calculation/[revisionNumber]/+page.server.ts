import type { CalculationData, CalculationTemplate, EngineModule, ProjectList } from '$lib/CostumTypes';

export const load = async ({ locals, params, setHeaders }) => {
	setHeaders({ 'cache-control': 'max-age=600' });

	const getProjectDetail = async () => {
		let project: ProjectList;
		try {
			project = await locals.pb.collection('project_list').getFirstListItem('revision_number="' + params.revisionNumber + '"', {
				expand: 'engine_model_id,engine_id'
			});
		} catch (error: any) {
			return { status: 'failed', message: `Project with revision number: ${params.revisionNumber}, Not Found` };
		}
		const { expand, ...data } = project;
		return { status: 'success', data: { ...data, esn: expand?.engine_id?.esn, model: expand?.engine_model_id?.name, model_id: expand?.engine_model_id?.id } as ProjectList };
	};

	const getCalculationData = async () => {
		let calculationData: CalculationData[];
		try {
			calculationData = await locals.pb.collection('calculation_data').getFullList({ filter: 'revision_number="' + params.revisionNumber + '"' });
		} catch (error: any) {
			return { status: 'failed', message: error.response.message, data: undefined };
		}

		if (calculationData.length) {
			return { status: 'success', data: calculationData };
		} else {
			return { status: 'failed', message: 'No calculation data for this revision project', data: calculationData };
		}
	};

	const getCalculationTemplate = async () => {
		let project = await getProjectDetail();

		if (project.status === 'failed' || project.data === undefined) return { status: 'failed', message: `Engine Model Not Found` };

		let calculationTemplate: CalculationTemplate[];
		try {
			calculationTemplate = await locals.pb.collection('calculation_tmp').getFullList({ filter: 'engine_model_id="' + project.data.model_id + '"' });
		} catch (error: any) {
			return { status: 'failed', code: error.response.code, message: error.response.message };
		}
		if (calculationTemplate.length) {
			return { status: 'success', data: calculationTemplate };
		} else {
			return { status: 'failed', message: 'No calculation template for this engine model', data: calculationTemplate };
		}
	};

	const getModule = async () => {
		let modules: EngineModule[];
		try {
			modules = await locals.pb.collection('engine_modules').getFullList({ sort: 'name' });
		} catch (error: any) {
			return { status: 'failed', code: error.response.code, message: error.response.message };
		}

		if (modules.length) {
			return { status: 'success', data: modules };
		} else {
			return { status: 'failed', message: `Modules Not Found`, data: modules };
		}
	};

	return {
		modules: await getModule(),
		projectDetail: await getProjectDetail(),
		calculationData: await getCalculationData(),
		calculationTemplate: await getCalculationTemplate()
	};
};
