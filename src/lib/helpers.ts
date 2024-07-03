import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { pb } from './pocketbaseClient';

import type { CalculationTemplate, Customer, EngineFamily, EngineList, EngineModel, EngineModule, ProjectList, ProjectType, TypedPocketBase, Unit, User, UserRole } from './CostumTypes';
import type { RecordListOptions, RecordModel, RecordService } from 'pocketbase';

export const getFirstPath = (s: string): string => {
	const pattern = /\/(\w+)\/\w+/;
	const result = s.match(pattern);
	return result ? `/${result[1]}` : '/';
};

class PageFile<T> {
	private api!: RecordService<T>;
	private options?: RecordListOptions;

	private _page: number = 1;
	private _perPage: number = 6;
	private _hasNextPage: boolean = false;
	private _hasPrevPage: boolean = false;

	private items: Writable<T[]> = writable([]);
	private currentPage: Writable<number> = writable(1);
	private perPage: Writable<number> = writable(6);
	private totalPages: Writable<number> = writable(1);
	private isLoading: Writable<boolean> = writable(false);
	private hasPrevPage: Writable<boolean> = writable(false);
	private hasNextPage: Writable<boolean> = writable(false);

	getState: () => {
		currentPage: Readable<number>;
		totalPages: Readable<number>;
		perPage: Readable<number>;
		items: Readable<T[]>;
		hasPrevPage: Readable<boolean>;
		hasNextPage: Readable<boolean>;
		isLoading: Readable<boolean>;
	};
	nextPage: () => void;
	prevPage: () => void;
	setPerPage: (number: number) => void;

	constructor(api: RecordService<T>, options?: RecordListOptions) {
		this.api = api;
		this.options = options;

		this.getState = () => {
			this.loadData();
			return {
				currentPage: derived(this.currentPage, ($currentPage) => $currentPage),
				totalPages: derived(this.totalPages, ($totalPages) => $totalPages),
				perPage: derived(this.perPage, ($perPage) => $perPage),
				items: derived(this.items, ($items) => $items),
				hasPrevPage: this.hasPrevPage,
				hasNextPage: this.hasNextPage,
				isLoading: this.isLoading
			};
		};

		this.nextPage = () => {
			if (!this._hasNextPage) return;
			this._page += 1;
			this.loadData();
		};

		this.prevPage = () => {
			if (!this._hasPrevPage) return;
			this._page -= 1;
			this.loadData();
		};
		this.setPerPage = (number) => {
			this._perPage = number;
		};
	}

	private async loadData() {
		this.isLoading.update((v) => true);
		let result = await this.api.getList(this._page, this._perPage, this.options);

		this.items.update((v) => result.items);
		this.currentPage.update((v) => result.page);
		this.perPage.update((v) => result.perPage);
		this.totalPages.update((v) => result.totalPages);

		this._page = result.page;

		if (result.page < result.totalPages) {
			this.hasNextPage.update((v) => true);
			this._hasNextPage = true;
		} else {
			this.hasNextPage.update((v) => false);
			this._hasNextPage = false;
		}
		if (result.page != 1 && result.page <= result.totalPages) {
			this.hasPrevPage.update((v) => true);
			this._hasPrevPage = true;
		} else {
			this.hasPrevPage.update((v) => false);
			this._hasPrevPage = false;
		}

		this.isLoading.update((v) => false);
	}
}

export class Client {
	private pb: TypedPocketBase;

	constructor() {
		this.pb = pb;
	}

	init<T = RecordModel>(idOrName: string, options?: RecordListOptions): PageFile<T> {
		return new PageFile<T>(this.pb.collection(idOrName), options);
	}
}

export interface TypedClient extends Client {
	init(idOrName: string, options?: RecordListOptions): PageFile<RecordModel>;
	init(idOrName: 'engine_families', options?: RecordListOptions): PageFile<EngineFamily>;
	init(idOrName: 'engine_models', options?: RecordListOptions): PageFile<EngineModel>;
	init(idOrName: 'engine_modules', options?: RecordListOptions): PageFile<EngineModule>;
	init(idOrName: 'customers', options?: RecordListOptions): PageFile<Customer>;
	init(idOrName: 'units', options?: RecordListOptions): PageFile<Unit>;
	init(idOrName: 'engine_list', options?: RecordListOptions): PageFile<EngineList>;
	init(idOrName: 'project_type', options?: RecordListOptions): PageFile<ProjectType>;
	init(idOrName: 'project_list', options?: RecordListOptions): PageFile<ProjectList>;
	init(idOrName: 'user_roles', options?: RecordListOptions): PageFile<UserRole>;
	init(idOrName: 'users', options?: RecordListOptions): PageFile<User>;
	init(idOrName: 'calculation_tmp', options?: RecordListOptions): PageFile<CalculationTemplate>;
}

export const createPageFile = () => {
	return new Client() as TypedClient;
};
