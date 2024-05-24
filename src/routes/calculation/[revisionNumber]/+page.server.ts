import type { RecordModel } from 'pocketbase';

export const load = async ({ locals, params }) => {
	const getProjectDetail = async () => {
		let project: RecordModel;
		try {
			// find project by revision number
			project = await locals.pb.collection('project_list').getFirstListItem('revision_number="' + params.revisionNumber + '"', {
				expand: 'engine_model_id,engine_id'
			});
		} catch (error: any) {
			console.log('[getProjectDetail]', error.response.code, error.response.message);
			return { status: 'failed', message: `Project with revision number: ${params.revisionNumber}, Not Found` };
		}
		const { expand, ...data } = project;
		return { status: 'success', data: { ...data, esn: expand?.engine_id.esn, model: expand?.engine_model_id.name, model_id: expand?.engine_model_id.id } as RecordModel };
	};

	const getCalculationData = async () => {
		let calculationData: RecordModel[];
		try {
			// get calculation data by revision number
			calculationData = await locals.pb.collection('calculation_data').getFullList({ filter: 'revision_number="' + params.revisionNumber + '"' });
		} catch (error: any) {
			console.log('getCalculationData', error.response.code, error.response.message);
			// return { code: error.response.code, message: error.response.message };
			return { status: 'failed', message: error.response.message, data: undefined };
		}

		if (calculationData.length) {
			return { status: 'success', data: calculationData };
		} else {
			return { status: 'failed', message: `Calculation Data for revision number: ${params.revisionNumber}, Not Found`, data: calculationData };
		}
	};

	const getCalculationTemplate = async () => {
		let project = await getProjectDetail();

		if (project.status === 'failed' || project.data === undefined) return { status: 'failed', message: `Engine Model Not Found` };

		let calculationTemplate: RecordModel[];
		try {
			// get all collection template by engine model - CFM56-7, CFM56-3, etc.
			calculationTemplate = await locals.pb.collection('calculation_tmp').getFullList({ filter: 'engine_model_id="' + project.data.model_id + '"' });
		} catch (error: any) {
			console.log('[getCalculationTemplate]', error.response.code, error.response.message);
			return { status: 'failed', code: error.response.code, message: error.response.message };
		}
		if (calculationTemplate.length) {
			return { status: 'success', data: calculationTemplate };
		} else {
			return { status: 'failed', message: `Calculation Template for engine model: ${project.data.model_id}, Not Found`, data: calculationTemplate };
		}
	};

	const getModule = async () => {
		let modules: RecordModel[];
		try {
			modules = await locals.pb.collection('engine_modules').getFullList({ sort: 'name' });
		} catch (error: any) {
			console.log('[getModule]', error.response.code, error.response.message);
			return { status: 'failed', code: error.response.code, message: error.response.message };
		}
		console.log(modules);

		if (modules.length) {
			return { status: 'success', data: modules };
		} else {
			return { status: 'failed', message: `Modules Not Found`, data: modules };
		}
	};

	return {
		module: await getModule(),
		projectDetail: await getProjectDetail(),
		calculationData: await getCalculationData(),
		calculationTemplate: await getCalculationTemplate()
	};
};
