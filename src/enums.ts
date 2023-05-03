interface Enum {
	[key: string]: number;
}

const generateEnum = (elemArray: string[]): Enum => {
	let res = {};

	for (let i = 0; i < elemArray.length; i++) {
		res[elemArray[i]] = i;
	}

	return res;
};

interface lifeCycle {
	play: number;
	pause: number;
	stop: number;
}

interface lifeCycles {
	[key: string]: lifeCycle;
}

const lifeCycle: lifeCycles = {
	LOADING: { play: 0, pause: 0, stop: 0 },
	IDLE: { play: 1, pause: 0, stop: 0 },
	STARTING: { play: 2, pause: 0, stop: 0 },
	RUNNING: { play: 2, pause: 1, stop: 1 },
	PAUSE: { play: 1, pause: 2, stop: 1 },
	STOPPING: { play: 0, pause: 0, stop: 2 },
};

const playerStates: lifeCycle[] = [
	lifeCycle.LOADING,
	lifeCycle.IDLE,
	lifeCycle.STARTING,
	lifeCycle.RUNNING,
	lifeCycle.PAUSE,
	lifeCycle.STOPPING,
];

interface ObjectKindType extends Enum {}

const ObjectKind: ObjectKindType = generateEnum(['scene', 'object']);
export { lifeCycle, playerStates, ObjectKind };
