import create, { StateCreator } from 'zustand';
import {
	codes,
	logs,
	objects,
	selectedObject,
	viewerController,
	UI,
	codespace,
	TreePos,
	objectTreeNode,
} from '@/types';
import { OBJECT_TYPE } from '@/constants';

const createViewerController: StateCreator<viewerController> = (set) => ({
	mouseIsEnterViewer: false,
	isGrid: false,
	currentLifeCycle: 1,
	toolState: 1,
	zoom: 1,
	cameraPos: {
		x: 0,
		y: 0,
	},
	optionState: {
		showGrid: false,
		fullScreen: false,
	},
	setZoom: (value) => set(() => ({ zoom: value })),
	setCameraPos: (value) => set(() => ({ cameraPos: value })),
	setMouseIsEnterViewer: (value) => set(() => ({ mouseIsEnterViewer: value })),
	setCurrentLifeCycle: (value) => set(() => ({ currentLifeCycle: value })),
	setToolState: (value) => set(() => ({ toolState: value })),
	setOptionState: (value) => set(() => ({ optionState: value })),
});

const createObjects: StateCreator<objects> = (set) => ({
	objectDatas: {},
	objectTree: [],
	setObjectDatas: (data) => {
		set(() => ({ objectDatas: data }));
	},
	setObjectTree: (treeData) => {
		set(() => ({ objectTree: treeData }));
	},
});

const createLogs: StateCreator<logs> = (set) => ({
	logs: [],
});

const createCodespace: StateCreator<codespace> = (set) => ({
	workMenu: [],
	selectedWorkMenu: -1,
	setWorkMenu: (data) => {
		set(() => ({ workMenu: data }));
	},
	setSelectedWorkMenu: (index) => {
		set(() => ({ selectedWorkMenu: index }));
	},
});

const createCodes: StateCreator<codes> = (set) => ({
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

const createUI: StateCreator<UI> = (set) => ({
	isSettingsOpen: false,
	setIsSettingsOpen: (value) => {
		set(() => ({
			isSettingsOpen: value,
		}));
	},
});

const createSelectedObject: StateCreator<selectedObject> = (set) => ({
	selectedObjectUUID: null,
	setSelectedObjectUUID: (value) => set(() => ({ selectedObjectUUID: value })),
});

export const useBoundStore = create<
	viewerController & objects & logs & codespace & codes & selectedObject & UI
>()((...a) => ({
	...createViewerController(...a),
	...createObjects(...a),
	...createLogs(...a),
	...createCodes(...a),
	...createSelectedObject(...a),
	...createUI(...a),
	...createCodespace(...a),
}));
