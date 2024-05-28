// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Customer, EngineFamily, EngineList, EngineModel, Unit } from '$lib/CostumTypes';
import PocketBase, { type AuthModel, RecordService } from 'pocketbase';

interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService;
	collection(idOrName: 'engine_families'): RecordService<EngineFamily>;
	collection(idOrName: 'engine_models'): RecordService<EngineModel>;
	collection(idOrName: 'customers'): RecordService<Customer>;
	collection(idOrName: 'units'): RecordService<Unit>;
	collection(idOrName: 'engine_list'): RecordService<EngineList>;
}

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
}

export {};
