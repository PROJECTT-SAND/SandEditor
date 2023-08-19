// declare const threeScene: THREE.Scene;
// declare const getObject: () => {
// 	scale: {
// 		x: number;
// 		y: number;
// 		z: number;
// 	};
// 	position: {
// 		x: number;
// 		y: number;
// 		z: number;
// 	};
// };

// declare const log: {
// 	text: (content: string) => void;
// };

// declare const Process: {
// 	on: (
// 		type: ProcessEvent,
// 		callback: EventListenerOrEventListenerObject | null
// 	) => void;
// };

// declare const Input: {
// 	on: (
// 		type: _InputEvent,
// 		callback: EventListenerOrEventListenerObject | null,
// 		options?: {
// 			keyType?: _KeyType[];
// 			shift?: boolean;
// 			alt?: boolean;
// 			ctrl?: boolean;
// 			//--
// 			once?: boolean;
// 			capture?: false;
// 			passive?: false;
// 		}
// 	) => void;
// 	getKeyDown: (keyType: KeyType) => boolean;
// 	getKeyHold: (keyType: KeyType) => boolean;
// 	getKeyUp: (keyType: KeyType) => boolean;
// };

// // ----------------------------------------------------------------

// const ProcessEvent = {
// 	Update: 0,
// 	Start: 1,
// } as const;
// declare type ProcessEvent = (typeof ProcessEvent)[keyof typeof ProcessEvent];

// const _InputEvent = {
// 	Hold: 0,
// 	Down: 1,
// 	Up: 2,
// } as const;
// declare type _InputEvent = (typeof _InputEvent)[keyof typeof _InputEvent];

// const _KeyType = {
// 	Enter: 13,
// 	ESC: 27,
// 	SpaceBar: 32,
// 	/** ! */
// 	Exclamation: 33,
// 	/** " */
// 	Quotation: 34,
// 	/** # */
// 	Crosshatch: 35,
// 	/** $ */
// 	Dollar: 36,
// 	/** % */
// 	Percent: 37,
// 	/** & */
// 	Ampersand: 38,
// 	/** ' */
// 	Apostrophe: 39,
// 	/** ( */
// 	ParenthesisLeft: 40,
// 	/** ) */
// 	ParenthesisRight: 41,
// 	/** ** */
// 	Asterisk: 42,
// 	/** ++ */
// 	Plus: 43,
// 	/** , */
// 	Comma: 44,
// 	/** -- */
// 	Hyphen: 45,
// 	/** . */
// 	Period: 46,
// 	/** / */
// 	Slash: 47,
// 	Zero: 48,
// 	One: 49,
// 	Two: 50,
// 	Three: 51,
// 	Four: 52,
// 	Five: 53,
// 	Six: 54,
// 	Seven: 55,
// 	Eight: 56,
// 	Nine: 57,
// 	Colon: 58,
// 	Semicolon: 59,
// 	AngleBracketsLeft: 60,
// 	Equal: 61,
// 	AngleBracketsRight: 62,
// 	Question: 63,
// 	At: 64,
// 	A: 65,
// 	B: 66,
// 	C: 67,
// 	D: 68,
// 	E: 69,
// 	F: 70,
// 	G: 71,
// 	H: 72,
// 	I: 73,
// 	J: 74,
// 	K: 75,
// 	L: 76,
// 	M: 77,
// 	N: 78,
// 	O: 79,
// 	P: 80,
// 	Q: 81,
// 	R: 82,
// 	S: 83,
// 	T: 84,
// 	U: 85,
// 	V: 86,
// 	W: 87,
// 	X: 88,
// 	Y: 89,
// 	Z: 90,
// 	BracketLeft: 91,
// 	BackSlash: 92,
// 	BracketRight: 93,
// 	Circumflex: 94,
// 	Underscore: 95,
// 	Grave: 96,
// 	BraceLeft: 123,
// 	Verticalbar: 124,
// 	BraceRight: 125,
// 	Tilde: 126,
// } as const;
// declare type _KeyType = (typeof _KeyType)[keyof typeof _KeyType];

// // ----------------------------------------------------------------

// // class currentObject {
// // 	name: string;
// // 	type: OBJECT_TYPE;
// // 	X: number;
// // 	Y: number;
// // 	isHidden: boolean;
// // 	parentUUID: string | null;
// // 	UUID: string;
// // }

// // ----------------------------------------------------------------

// // declare module 'process' {
// // 	const on: (
// // 		type: ProcessEvent,
// // 		callback: EventListenerOrEventListenerObject | null
// // 	) => void;
// // }

// // declare module 'keyboard' {
// // 	const on: (
// // 		type: KeyDownEvent | KeyUpEvent,
// // 		callback: EventListenerOrEventListenerObject | null
// // 	) => void;
// // }

// // declare module 'parameter' {
// // 	const newTextParam: (text: string) => string;
// // }

// // declare module 'object' {
// // 	const getCurrentObject: () => currentObject;
// // }

// // declare module 'store' {
// // 	const getStore: () => string;
// // }
