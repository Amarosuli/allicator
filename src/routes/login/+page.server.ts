import { loginSchema } from '$lib/zodSchema.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/'); // prevent user access to login page directly
	return { form: await superValidate(zod(loginSchema)) };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('users').authWithPassword(form.data.employeeId, form.data.password);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} Crosscheck your ID and Password are typed correctly or make sure your ID already registered.`;
			return message(form, errorMessage, { status: error?.status });
		}

		throw redirect(302, '/');
	}
};
