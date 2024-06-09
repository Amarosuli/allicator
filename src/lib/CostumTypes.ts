import PocketBase, { RecordService, type RecordModel } from 'pocketbase';

export interface EngineFamily extends RecordModel {
	name: string;
	description: string;
}
export interface EngineModel extends RecordModel {
	name: string;
	description: string;
	family_id: EngineFamily['id'];
	expand?: {
		family_id: EngineFamily;
	};
}
export interface EngineModule extends RecordModel {
	name: string;
	description: string;
	parent_module: EngineModule['id'];
	expand?: {
		parent_module: EngineModule;
	};
}
export interface Customer extends RecordModel {
	name: string;
	description: string;
	logo: string;
	code_IATA: string;
	code_ICAO: string;
}
export interface Unit extends RecordModel {
	name: string;
	description: string;
}
export interface EngineList extends RecordModel {
	esn: string;
	note: string;
}
export interface ProjectType extends RecordModel {
	name: string;
	code: string;
	description: string;
}
export interface UserRole extends RecordModel {
	name: string;
	description: string;
}
export interface User extends RecordModel {
	username: string;
	email: string;
	name: string;
	avatar: string;
	unit_id: string;
	role_id: string;
	expand?: {
		unit_id: Unit;
		role_id: UserRole;
	};
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService;
	collection(idOrName: 'engine_families'): RecordService<EngineFamily>;
	collection(idOrName: 'engine_models'): RecordService<EngineModel>;
	collection(idOrName: 'engine_modules'): RecordService<EngineModule>;
	collection(idOrName: 'customers'): RecordService<Customer>;
	collection(idOrName: 'units'): RecordService<Unit>;
	collection(idOrName: 'engine_list'): RecordService<EngineList>;
	collection(idOrName: 'project_type'): RecordService<ProjectType>;
	collection(idOrName: 'user_roles'): RecordService<UserRole>;
	collection(idOrName: 'users'): RecordService<User>;
}

export type FileUrlOption = {
	download?: boolean;
	thumb?: string;
};
