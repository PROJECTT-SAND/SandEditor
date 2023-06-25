export const TOOL = {
	Hand: 0,
	Move: 1,
} as const;
export type TOOL = (typeof TOOL)[keyof typeof TOOL];

export const OPTION = {
	FullScreen: 0,
	ShowGrid: 1,
} as const;
export type OPTION = (typeof OPTION)[keyof typeof OPTION];

export const LIFECYCLE = {
	LOADING: 0,
	IDLE: 1,
	STARTING: 2,
	RUNNING: 3,
	PAUSE: 4,
	STOPPING: 5,
} as const;
export type LIFECYCLE = (typeof LIFECYCLE)[keyof typeof LIFECYCLE];

export const PLAYER = {
	Play: 0,
	Pause: 1,
	Stop: 2,
} as const;
export type PLAYER = (typeof PLAYER)[keyof typeof PLAYER];

export const OBJECT_TYPE = {
	Scene: 0,
	Object: 1,
} as const;
export type OBJECT_TYPE = (typeof OBJECT_TYPE)[keyof typeof OBJECT_TYPE];

export const LOG_KIND = {
	Command: 0,
	Text: 1,
	Warning: 2,
	Error: 3,
};
export type LOG_KIND = (typeof LOG_KIND)[keyof typeof LOG_KIND];

export const ButtonState = {
	DISABLED: 0,
	DEFAULT: 1,
	PRESSED: 2,
} as const;

export const ButtonLifeCycle = [
	{ play: 0, pause: 0, stop: 0 },
	{ play: 1, pause: 0, stop: 0 },
	{ play: 2, pause: 0, stop: 0 },
	{ play: 2, pause: 1, stop: 1 },
	{ play: 1, pause: 2, stop: 1 },
	{ play: 0, pause: 0, stop: 2 },
] as const;

export const ButtonLifeCycleState = [
	[0, 0, 0],
	[1, 0, 0],
	[2, 0, 0],
	[2, 1, 1],
	[1, 2, 1],
	[0, 0, 2],
] as const;

export const ProcessEvent = {
	Update: 0,
	Start: 1,
} as const;
export type ProcessEvent = (typeof ProcessEvent)[keyof typeof ProcessEvent];

export const KeyboardEvent = {
	Press: 0,
	Down: 1,
	Up: 2,
} as const;
export type KeyboardEvent = (typeof KeyboardEvent)[keyof typeof KeyboardEvent];

export const KeyType = {
	Enter: 13,
	ESC: 27,
	SpaceBar: 32,
	Exclamation: 33,
	Quotation: 34,
	Crosshatch: 35,
	Dollar: 36,
	Percent: 37,
	Ampersand: 38,
	Apostrophe: 39,
	ParenthesisLeft: 40,
	ParenthesisRight: 41,
	Asterisk: 42,
	Plus: 43,
	Comma: 44,
	Hyphen: 45,
	Period: 46,
	Slash: 47,
	Zero: 48,
	One: 49,
	Two: 50,
	Three: 51,
	Four: 52,
	Five: 53,
	Six: 54,
	Seven: 55,
	Eight: 56,
	Nine: 57,
	Colon: 58,
	Semicolon: 59,
	AngleBracketsLeft: 60,
	Equal: 61,
	AngleBracketsRight: 62,
	Question: 63,
	At: 64,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	BracketLeft: 91,
	BackSlash: 92,
	BracketRight: 93,
	Circumflex: 94,
	Underscore: 95,
	Grave: 96,
	BraceLeft: 123,
	Verticalbar: 124,
	BraceRight: 125,
	Tilde: 126,
} as const;
export type KeyType = (typeof KeyType)[keyof typeof KeyType];
