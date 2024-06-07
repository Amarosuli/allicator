import { fail, message, superValidate } from 'sveltekit-superforms';
import { unitSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/unit'); // Prevent guest users from accessing this page directly.

	const getUnitById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('units').getOne(id);
	};

	return {
		unit: await getUnitById(),
		form: await superValidate(zod(unitSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(unitSchema));

		let id = url.searchParams.get('id');
		if (!id) return message(form, 'id not define', { status: 400 });
		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('units').update(id, form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Update Successfully!');
	}
};
