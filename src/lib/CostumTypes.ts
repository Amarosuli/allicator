import type { RecordModel } from 'pocketbase';

export interface EngineFamily extends RecordModel {
	name: string;
	description: string;
}
export interface EngineModel extends RecordModel {
	name: string;
	description: string;
	family_id: EngineFamily['id'];
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
