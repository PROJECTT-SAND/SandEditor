import create, { StateCreator } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { codes, logs, objects, viewerController, UI, codespace } from '@/types';

type mystate = viewerController & objects & logs & codespace & codes & UI;

const createViewerController: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	viewerController
> = (set) => ({
	mouseIsEnterViewer: false,
	isGrid: false,
	currentLifeCycle: 1,
	toolState: 1,
	cameraPos: {
		x: 0,
		y: 0,
	},
	mousePos: {
		x: 0,
		y: 0,
	},
	zoom: 1,
	optionState: {
		showGrid: false,
		fullScreen: false,
	},
	selectedObjectUUID: null,
	setSelectedObjectUUID: (value) => set(() => ({ selectedObjectUUID: value })),
	setCameraPos: (value) => set(() => ({ cameraPos: value })),
	setMousePos: (value) => set(() => ({ mousePos: value })),
	setZoom: (value) => set(() => ({ zoom: value })),
	setMouseIsEnterViewer: (value) => set(() => ({ mouseIsEnterViewer: value })),
	setCurrentLifeCycle: (value) => set(() => ({ currentLifeCycle: value })),
	setToolState: (value) => set(() => ({ toolState: value })),
	setOptionState: (value) => set(() => ({ optionState: value })),
});

const createObjects: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	objects
> = (set) => ({
	objectDatas: {},
	objectTree: [],
	setObjectDatas: (data) => {
		set(() => ({ objectDatas: data }));
	},
	setObjectTree: (treeData) => {
		set(() => ({ objectTree: treeData }));
	},
});

const createLogs: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	logs
> = (set) => ({
	logs: [],
});

const createCodespace: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	codespace
> = (set) => ({
	workMenu: [],
	selectedWorkMenu: -1,
	setWorkMenu: (data) => {
		set(() => ({ workMenu: data }));
	},
	setSelectedWorkMenu: (index) => {
		set(() => ({ selectedWorkMenu: index }));
	},
});

const createCodes: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	codes
> = (set) => ({
	codeFiles: {
		test: {
			contents: '',
			params: {},
		},
	},
	setCodeFiles: (filename, data) => {
		set((values) => ({
			codeFiles: { ...values.codeFiles, [filename]: data },
		}));
	},
});

const createUI: StateCreator<
	mystate,
	[['zustand/subscribeWithSelector', never]],
	[],
	UI
> = (set) => ({
	isSettingsOpen: false,
	setIsSettingsOpen: (value) => {
		set(() => ({
			isSettingsOpen: value,
		}));
	},
});

export const useBoundStore = create(
	subscribeWithSelector<
		viewerController & objects & logs & codespace & codes & UI
	>((...a) => ({
		...createViewerController(...a),
		...createObjects(...a),
		...createLogs(...a),
		...createCodes(...a),
		...createUI(...a),
		...createCodespace(...a),
	}))
);
