const lifeCycle = {
	LOADING: { play: 0, pause: 0, stop: 0 },
	IDLE: { play: 1, pause: 0, stop: 0 },
	STARTING: { play: 2, pause: 0, stop: 0 },
	RUNNING: { play: 2, pause: 1, stop: 1 },
	PAUSE: { play: 1, pause: 2, stop: 1 },
	STOPPING: { play: 0, pause: 0, stop: 2 },
};

const playerStates = [
	lifeCycle.LOADING,
	lifeCycle.IDLE,
	lifeCycle.STARTING,
	lifeCycle.RUNNING,
	lifeCycle.PAUSE,
	lifeCycle.STOPPING,
];

const generateEnum = (elemArray: Array) => {
	let res = {};

	for (let i = 0; i < elemArray.length; i++) {
		res[elemArray[i]] = i;
	}

	return res;
};

export { lifeCycle, playerStates };
