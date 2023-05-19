import { OBJECT_TYPE } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

export class Object {
	name: string;
	type: OBJECT_TYPE;
	isHidden: boolean;
	parentUUID: string | null;
	UUID: string;

	constructor(
		name: string,
		type: OBJECT_TYPE,
		isHidden: boolean,
		parentUUID: string | null
	) {
		this.UUID = uuidv4();
		this.name = name;
		this.type = type;
		this.isHidden = isHidden;
		this.parentUUID = parentUUID;
	}
}
