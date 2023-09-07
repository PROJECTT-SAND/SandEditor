import { SandObjectTypes } from '@/types';
import { setObjectDatas } from './renderer';

export class objectDataManager {
	static objectData: Record<string, SandObjectTypes> = {};

	static getObjectData = (uuid: string) => {
		return objectDataManager.objectData[uuid];
	};

	static setObjectData = (data: SandObjectTypes, uuid: string) => {
		objectDataManager.objectData[uuid] = data;
		setObjectDatas(data, uuid);
	};
}
