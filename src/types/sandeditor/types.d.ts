const ProcessEvent = {
	Update: 0,
	Start: 1,
} as const;
declare type ProcessEvent = (typeof ProcessEvent)[keyof typeof ProcessEvent];

const KeyDownEvent = {
	Any: 0,
	W: 1,
	a: 2,
	s: 3,
	d: 4,
} as const;
declare type KeyDownEvent = (typeof KeyDownEvent)[keyof typeof KeyDownEvent];

const KeyUpEvent = {
	Any: 0,
	W: 1,
	a: 2,
	s: 3,
	d: 4,
} as const;
declare type KeyUpEvent = (typeof KeyUpEvent)[keyof typeof KeyUpEvent];

// ----------------------------------------------------------------

class currentObject {
	name: string;
	type: OBJECT_TYPE;
	X: number;
	Y: number;
	isHidden: boolean;
	parentUUID: string | null;
	UUID: string;
}

// ----------------------------------------------------------------

declare module 'process' {
	const on: (
		type: ProcessEvent,
		callback: EventListenerOrEventListenerObject | null
	) => void;
}

declare module 'keyboard' {
	const on: (
		type: KeyDownEvent | KeyUpEvent,
		callback: EventListenerOrEventListenerObject | null
	) => void;
}

declare module 'parameter' {
	const newTextParam: (text: string) => string;
}

declare module 'object' {
	const getCurrentObject: () => currentObject;
}

declare module 'store' {
	const getStore: () => string;
}
