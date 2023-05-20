import create, { StateCreator } from 'zustand';
import { codes, logs, objects, viewerController } from '@/types';

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
	objValue: {
		example1: { x: 0, y: 0 },
	},
	setObjValue: (objName, pos) => {
		// set(() => ({ objValue[objName]: pos }));
	},
});

const createLogs: StateCreator<logs> = (set) => ({
	logs: [],
});

const createCodes: StateCreator<codes> = (set) => ({
	codes: {
		'qwe.sdcod': `func null start(obj:obj)
      obj.[x, y, size] = [10, 20, 100]

      loop(10)
        obj.X += 10`,
	},
});

export const useBoundStore = create<
	viewerController & objects & logs & codes
>()((...a) => ({
	...createViewerController(...a),
	...createObjects(...a),
	...createLogs(...a),
	...createCodes(...a),
}));
