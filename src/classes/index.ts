import { OBJECT_TYPE, ProcessEvent } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

export class Object {
	name: string;
	type: OBJECT_TYPE;
	X: number;
	Y: number;
	isHidden: boolean;
	parentUUID: string | null;
	UUID: string;
	controller: string[];

	constructor(
		name: string,
		type: OBJECT_TYPE,
		isHidden: boolean,
		parentUUID: string | null
	) {
		this.UUID = uuidv4();
		this.name = name;
		this.type = type;
		this.X = 0;
		this.Y = 0;
		this.isHidden = isHidden;
		this.parentUUID = parentUUID;
		this.controller = [];
	}
}

export class EventEmitter<T extends number> {
	target: EventTarget;

	constructor() {
		this.target = new EventTarget();
	}

	addEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | AddEventListenerOptions | undefined
	) {
		return this.target.addEventListener(type.toString(), callback, options);
	}

	removeEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined
	) {
		return this.target.removeEventListener(type.toString(), callback, options);
	}

	dispatchEvent(type: T, detail?: any) {
		return this.target.dispatchEvent(
			new CustomEvent(type.toString(), { detail, cancelable: true })
		);
	}
}
