import { fail, message, superValidate } from 'sveltekit-superforms';
import { userRoleSchema } from '$lib/zodSchema';
import { redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) throw redirect(302, '/user_role'); // Prevent guest users from accessing this page directly.

	const getUserRoleById = async () => {
		let id = url.searchParams.get('id');
		if (id) return await locals.pb.collection('user_roles').getOne(id);
	};

	return {
		userRole: await getUserRoleById(),
		form: await superValidate(zod(userRoleSchema))
	};
};

export const actions: Actions = {
	default: async ({ locals, request, url }) => {
		const form = await superValidate(request, zod(userRoleSchema));

		let id = url.searchParams.get('id');
		if (!id) return message(form, 'id not define', { status: 400 });
		if (!form.valid) return fail(400, { form });

		try {
			await locals.pb.collection('user_roles').update(id, form.data);
		} catch (error: any) {
			const errorMessage = `${error?.response.message} | PocketBase error.`;
			return message(form, errorMessage, { status: error?.status });
		}

		return message(form, 'Update Successfully!');
	}
};
