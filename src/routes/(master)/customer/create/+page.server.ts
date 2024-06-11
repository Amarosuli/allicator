import { fail, message, superValidate } from 'sveltekit-superforms';
import { customerSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/customer'); // Prevent guest users from accessing this page directly.
	return { form: await superValidate(zod(customerSchema)) };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(customerSchema));

		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('customers').create(form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Create Data successfully!');
	}
};
