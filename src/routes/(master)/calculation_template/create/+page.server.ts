import { fail, message, superValidate } from 'sveltekit-superforms';
import { collectionTemplateSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/calculation_template'); // Prevent guest users from accessing this page directly.

	const getEngineModel = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('engine_models').getFullList();
		return result.map(({ id, name }) => {
			return { label: name, value: id };
		});
	};

	const getEngineModule = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('engine_modules').getFullList();
		return result.map(({ id, name, description }) => {
			let label = `${name} - ${description}`;
			return { label, value: id };
		});
	};

	return { form: await superValidate(zod(collectionTemplateSchema)), engineModels: await getEngineModel(), engineModules: await getEngineModule() };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(collectionTemplateSchema));

		if (!form.valid) return fail(400, { form });

		return; // Create functionality will be hold until better validation strategy is implemented.

		try {
			await locals.pb.collection('calculation_tmp').create(form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Create Data successfully!');
	}
};
