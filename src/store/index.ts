import create, { StateCreator } from 'zustand';
import {
	codes,
	logs,
	objects,
	selectedObject,
	viewerController,
} from '@/types';
import { OBJECT_TYPE } from '@/constants';

const createViewerController: StateCreator<viewerController> = (set) => ({
	mouseIsEnterViewer: false,
	isGrid: false,
	currentLifeCycle: 1,
	toolState: 1,
	optionState: {
		showGrid: false,
		fullScreen: false,
	},
	setMouseIsEnterViewer: (value) => set(() => ({ mouseIsEnterViewer: value })),
	setCurrentLifeCycle: (value) => set(() => ({ currentLifeCycle: value })),
	setToolState: (value) => set(() => ({ toolState: value })),
	setOptionState: (value) => set(() => ({ optionState: value })),
});

const createObjects: StateCreator<objects> = (set) => ({
	objectDatas: {
		'1': {
			name: 'InGame',
			type: OBJECT_TYPE.Scene,
			X: 0,
			Y: 0,
			isHidden: false,
			parentUUID: null,
			UUID: '1',
		},
		// '2': {
		// 	name: 'Tlqkf',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 110,
		// 	Y: 0,
		// 	isHidden: true,
		// 	parentUUID: '1',
		// 	UUID: '2',
		// },
		// '3': {
		// 	name: 'Tlqkf2',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 220,
		// 	Y: 0,
		// 	isHidden: false,
		// 	parentUUID: '1',
		// 	UUID: '3',
		// },
		// '4': {
		// 	name: 'Chr1',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 330,
		// 	Y: 0,
		// 	isHidden: false,
		// 	parentUUID: '1',
		// 	UUID: '4',
		// },
		// '5': {
		// 	name: 'Head',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 440,
		// 	Y: 0,
		// 	isHidden: false,
		// 	parentUUID: '4',
		// 	UUID: '5',
		// },
		// '6': {
		// 	name: 'arm',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 550,
		// 	Y: 0,
		// 	isHidden: false,
		// 	parentUUID: '4',
		// 	UUID: '6',
		// },
		// '7': {
		// 	name: 'body',
		// 	type: OBJECT_TYPE.Object,
		// 	X: 660,
		// 	Y: 0,
		// 	isHidden: false,
		// 	parentUUID: '4',
		// 	UUID: '7',
		// },
	},
	objectTree: [
		{
			uuid: '1',
			children: [
				// {
				// 	uuid: '2',
				// 	children: [],
				// },
				// {
				// 	uuid: '3',
				// 	children: [],
				// },
				// {
				// 	uuid: '4',
				// 	children: [
				// 		{
				// 			uuid: '5',
				// 			children: [],
				// 		},
				// 		{
				// 			uuid: '6',
				// 			children: [],
				// 		},
				// 		{
				// 			uuid: '7',
				// 			children: [],
				// 		},
				// 	],
				// },
			],
		},
	],
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

const createCodes: StateCreator<codes> = (set) => ({
	codeFiles: {
		// 'qwe.sdcod': {
		// 	contents: `process.addEventListener(process.UpdateEvent, () => {
		//   this.X += 10;
		// })`,
		// 	params: { index: { type: 1, value: 0 } },
		// },
	},
	setCodeFiles: (filename, data) => {
		set((values) => ({
			codeFiles: { ...values.codeFiles, [filename]: data },
		}));
	},
});

const createSelectedObject: StateCreator<selectedObject> = (set) => ({
	selectedObjectUUID: null,
	setSelectedObjectUUID: (value) => set(() => ({ selectedObjectUUID: value })),
});

export const useBoundStore = create<
	viewerController & objects & logs & codes & selectedObject
>()((...a) => ({
	...createViewerController(...a),
	...createObjects(...a),
	...createLogs(...a),
	...createCodes(...a),
	...createSelectedObject(...a),
}));
