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
export interface CalculationTemplate extends RecordModel {
	title: string;
	description: string;
	engine_model_id: EngineModel['id'];
	module_id: EngineModule['id'];
	formula: string;
	constanta: string;
	subtask: string;
}
export interface CalculationData extends RecordModel {
	project_id: ProjectList['id'];
	revision_number: number;
	module: string;
	category: string;
	note: string;
	user_id: string;
	user_name: string;
	order_number: string;
	raw_input: string;
	result: string;
	save_at: string;
}
export interface ProjectList extends RecordModel {
	revision_number: string;
	engine_config: string;
	engine_model_id: EngineModel['id'];
	engine_id: EngineList['id'];
	customer: Customer['id'];
	project_type_id: ProjectType['id'];
	description: string;
	status: 'OPEN' | 'CLOSED';
	started_at: string;
	finished_at: string;
	expand?: {
		engine_model_id?: EngineModel;
		engine_id?: EngineList;
		customer?: Customer;
		project_type_id?: ProjectType;
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
	collection(idOrName: 'calculation_tmp'): RecordService<CalculationTemplate>;
	collection(idOrName: 'calculation_data'): RecordService<CalculationData>;
	collection(idOrName: 'project_list'): RecordService<ProjectList>;
}

export type FileUrlOption = {
	download?: boolean;
	thumb?: string;
};
