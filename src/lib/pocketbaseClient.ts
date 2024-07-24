import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';

import type { FileUrlOption, TypedPocketBase } from './CostumTypes';

export const pb = new PocketBase(env.PUBLIC_PB_URL).autoCancellation(false) as TypedPocketBase;

export const getFileUrl = (collectionIdOrCollectionName: string, id: string, filename: string, option?: FileUrlOption): string => {
	return `${env.PUBLIC_PB_URL}/api/files/${collectionIdOrCollectionName}/${id}/${filename}?thumb=${option?.thumb}&download=${option?.download ? 1 : 0}`;
};
