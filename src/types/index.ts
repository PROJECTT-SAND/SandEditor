import { Object } from '@/classes';
import { LOG_KIND } from '@/constants';

export interface viewerController {
	mouseIsEnterViewer: boolean;
	isGrid: boolean;
	currentLifeCycle: number;
	toolState: number;
	optionState: {
		showGrid: boolean;
		fullScreen: boolean;
	};
	zoom: number;
	cameraPos: { x: number; y: number };
	setZoom: (zoom: number) => void;
	setCameraPos: (value: { x: number; y: number }) => void;
	setMouseIsEnterViewer: (value: boolean) => void;
	setCurrentLifeCycle: (value: number) => void;
	setToolState: (value: number) => void;
	setOptionState: (value: { showGrid: boolean; fullScreen: boolean }) => void;
}

export interface objects {
	objectDatas: { [uuid: string]: Object };
	objectTree: objectTreeNode[];
	setObjectDatas: (data: { [uuid: string]: Object }) => void;
	setObjectTree: (treeData: objectTreeNode[]) => void;
}

export interface file {
	fullName: string;
	fileName: string;
	extension: string;
}

export interface logs {
	logs: {
		kind: LOG_KIND;
		content: string;
		time: string;
	}[];
}

export interface codespace {
	workMenu: file[];
	selectedWorkMenu: null | number;
	setWorkMenu: (data: file[]) => void;
	setSelectedWorkMenu: (index: number | null) => void;
}

export interface codeFile {
	contents: string;
	params: { [key: string]: { type: number; value: any } };
}

export interface codes {
	// codes: { [key: string]: String };

	codeFiles: {
		[key: string]: codeFile;
	};

	// setCodes: (filename: string, code: string) => void;

	setCodeFiles: (filename: string, data: codeFile) => void;
}

export interface UI {
	isSettingsOpen: boolean;
	setIsSettingsOpen: (value: boolean) => void;
}

export interface selectedObject {
	selectedObjectUUID: string | null;
	setSelectedObjectUUID: (value: string | null) => void;
}

export interface objectTreeNode {
	uuid: string;
	children: objectTreeNode[];
}

export type TreePos = number[];
