import { fail, message, superValidate } from 'sveltekit-superforms';
import { engineModelSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/engine_model'); // Prevent guest users from accessing this page directly.

	const getEngineModelById = async () => {
		let id = url.searchParams.get('id');
		if (id)
			return await locals.pb.collection('engine_models').getOne(id, {
				expand: 'family_id'
			});
	};

	const getEngineFamily = async (): Promise<SelectOption[]> => {
		const result = await locals.pb.collection('engine_families').getFullList();
		return result.map(({ id, name }) => {
			return { label: name, value: id };
		});
	};

	return {
		engineModel: await getEngineModelById(),
		engineFamilies: await getEngineFamily(),
		form: await superValidate(zod(engineModelSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(engineModelSchema));

		let id = url.searchParams.get('id');
		if (!id) return message(form, 'id not define', { status: 400 });
		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('engine_models').update(id, form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Update Successfully!');
	}
};
