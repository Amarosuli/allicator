import { getFileUrl } from '$lib/pocketbaseClient.js';

export const load = async ({ locals }) => {
	return {
		user: locals.user,
		avatar: locals.user ? getFileUrl(locals.user.collectionName, locals.user.id, locals.user.avatar) : '',
		role: locals.user?.role_id ? await locals.pb.collection('user_roles').getOne(locals.user.role_id) : undefined
	};
};
