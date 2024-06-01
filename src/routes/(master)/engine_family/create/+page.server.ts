import { fail, message, superValidate } from 'sveltekit-superforms';
import { engineFamilySchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/engine_family'); // Prevent guest users from accessing this page directly.
	return { form: await superValidate(zod(engineFamilySchema)) };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(engineFamilySchema));

		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('engine_families').create(form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Create Data successfully!');
	}
};
