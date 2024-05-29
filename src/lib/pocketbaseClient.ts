import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const pb: PocketBase = new PocketBase(PUBLIC_PB_URL).autoCancellation(false);

type Option = {
	download?: boolean;
	thumb?: '';
};
export const getFileUrl = (collectionIdOrCollectionName: string, id: string, filename: string, option?: Option): string => {
	return `${PUBLIC_PB_URL}/api/files/${collectionIdOrCollectionName}/${id}/${filename}?thumb=${option?.thumb}&download=${option?.download ? 1 : 0}`;
};
