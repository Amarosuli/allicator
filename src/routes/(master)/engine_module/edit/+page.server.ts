import { fail, message, superValidate } from 'sveltekit-superforms';
import { engineModuleSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/engine_module'); // Prevent guest users from accessing this page directly.

	const getEngineModuleById = async () => {
		let id = url.searchParams.get('id');
		if (id)
			return await locals.pb.collection('engine_modules').getOne(id, {
				expand: 'parent_module'
			});
	};

	const getEngineModule = async () => {
		const result = await locals.pb.collection('engine_modules').getFullList();
		return result.map(({ id, name, description }) => {
			return { label: `${name} - ${description}`, value: id };
		});
	};

	return {
		engineModule: await getEngineModuleById(),
		engineModules: await getEngineModule(),
		form: await superValidate(zod(engineModuleSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(engineModuleSchema));

		let id = url.searchParams.get('id');
		if (!id) return message(form, 'id not define', { status: 400 });
		if (!form.valid) return fail(400, { form });
		if (!form.data.parent_module) form.data.parent_module = '';

		try {
			await locals.pb.collection('engine_modules').update(id, form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Update Successfully!');
	}
};
