import { fail, message, superValidate } from 'sveltekit-superforms';
import { engineModuleSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/engine_module'); // Prevent guest users from accessing this page directly.

	const getEngineModule = async () => {
		let result = await locals.pb.collection('engine_modules').getFullList();
        return result.map(({ id, name, description }) => {
			return { label: `${name} - ${description}`, value: id };
		});
	};
	return { form: await superValidate(zod(engineModuleSchema)), engineModules: await getEngineModule() };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(engineModuleSchema));

		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('engine_modules').create(form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}
		return message(form, 'Create Data successfully!');
	}
};
