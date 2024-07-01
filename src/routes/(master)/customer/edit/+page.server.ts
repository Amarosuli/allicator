import { fail, message, superValidate } from 'sveltekit-superforms';
import { customerSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/customer'); // Prevent guest users from accessing this page directly.

	const getCustomerById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('customers').getOne(id);
	};

	return {
		customer: await getCustomerById(),
		form: await superValidate(zod(customerSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(customerSchema));

		let id = url.searchParams.get('id');
		if (!id) return message(form, 'id not define', { status: 400 });
		if (!form.valid) return fail(400, { form });

		let logo = !form.data.logo ? null : form.data.logo;

		try {
			await locals.pb.collection('customers').update(id, { ...form.data, logo });
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Update successfully!');
	}
};
