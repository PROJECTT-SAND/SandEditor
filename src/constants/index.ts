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
	Press: {
		W: 0,
	},
	Down: {
		Any: 0,
	},
} as const;
export type KeyboardEvent = (typeof KeyboardEvent)[keyof typeof KeyboardEvent];