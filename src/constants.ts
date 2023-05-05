export const TOOL = {
	Hand: 0,
	Move: 1,
} as const;
type TOOL = (typeof TOOL)[keyof typeof TOOL];

export const OPTION = {
	FullScreen: 0,
	ShowGrid: 1,
} as const;
type OPTION = (typeof OPTION)[keyof typeof OPTION];

export const LIFECYCLE = {
	LOADING: 0,
	IDLE: 1,
	STARTING: 2,
	RUNNING: 3,
	PAUSE: 4,
	STOPPING: 5,
} as const;
type LIFECYCLE = (typeof LIFECYCLE)[keyof typeof LIFECYCLE];

export const PLAYER = {
	Play: 0,
	Pause: 1,
	Stop: 2,
} as const;
type PLAYER = (typeof PLAYER)[keyof typeof PLAYER];

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
