import { fail, message, superValidate } from 'sveltekit-superforms';
import { projectListSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/project_list'); // Prevent guest users from accessing this page directly.

	const getEngineModel = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('engine_models').getFullList();
		return result.map(({ id, name }) => {
			return { label: name, value: id };
		});
	};

	const getEngineList = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('engine_list').getFullList();
		return result.map(({ id, esn }) => {
			return { label: esn, value: id };
		});
	};

	const getCustomerList = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('customers').getFullList();
		return result.map(({ id, name }) => {
			return { label: name, value: id };
		});
	};

	const getProjectTypeList = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('project_type').getFullList();
		return result.map(({ id, name }) => {
			return { label: name, value: id };
		});
	};

	return { form: await superValidate(zod(projectListSchema)), engineModels: await getEngineModel(), engineList: await getEngineList(), customers: await getCustomerList(), projectTypes: await getProjectTypeList() };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(projectListSchema));

		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('project_list').create(form.data);
		} catch (error: any) {
			console.log(error);
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}
		return message(form, 'Create Data successfully!');
	}
};
