import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase, { type RecordModel } from 'pocketbase';

export const pb: PocketBase = new PocketBase(PUBLIC_PB_URL);

type Option = {
	pocketbase?: PocketBase;
	thumb?: string;
};
export const getFileUrl = (record: RecordModel, option: Option): string => {
	return option.pocketbase ? option.pocketbase.files.getUrl(record, record.documents[0], { thumb: option.thumb }) : pb.files.getUrl(record, record.documents[0], { thumb: option.thumb });
};
