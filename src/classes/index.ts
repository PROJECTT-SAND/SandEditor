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
	}
}

export class EventEmitter<T> {
	target: EventTarget;

	constructor() {
		this.target = new EventTarget();
	}

	addEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | AddEventListenerOptions | undefined
	) {
		return this.target.addEventListener(typeof type, callback, options);
	}

	removeEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined
	) {
		return this.target.removeEventListener(typeof type, callback, options);
	}

	dispatchEvent(type: T, detail?: any) {
		return this.target.dispatchEvent(
			new CustomEvent(typeof type, { detail, cancelable: true })
		);
	}
}

// export class aaa extends EventEmitter<Process> {
// 	// update() {
// 	// 	this.dispatchEvent(ProcessEvent.Update, null);
// 	// }

// 	// Start() {
// 	// 	this.dispatchEvent(ProcessEvent.Start, null);
// 	// }

// 	on(
// 		type: Process,
// 		callback: EventListenerOrEventListenerObject | null,
// 		options?: boolean | AddEventListenerOptions | undefined
// 	) {
// 		return this.addEventListener(type, callback, options);
// 	}
// }

// const processEventTarget = new EventEmitter<Process>();

// const process = {
// 	on: (type: Process, callback: EventListenerOrEventListenerObject | null) => {
// 		processEventTarget.addEventListener(type, callback);
// 	},
// };

// processEventTarget.dispatchEvent(Process.Start);
