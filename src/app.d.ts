// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedPocketBase } from '$lib/CostumTypes';
import { type AuthModel } from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase;
			user: AuthModel | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface SelectOption {
		label: string;
		value: string;
	}
}

export {};
