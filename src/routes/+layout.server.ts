export const load = async ({ locals }) => {
	return {
		user: locals.pb.authStore.model,
		role: locals.pb.authStore.model?.role_id ? await locals.pb.collection('user_roles').getOne(locals.pb.authStore.model.role_id) : undefined
	};
};
