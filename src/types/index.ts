import { SandCamera, SandObject, SandObjectBase, SandScene } from '@/classes';
import { LOG_KIND } from '@/constants';

export type sandObjectTypes = (SandObject | SandScene | SandCamera)

// 이걸 꼭 이렇게 타입을 개별 파일로 빼야하나?
export interface viewerController {
	mouseIsEnterViewer: boolean;
	isGrid: boolean;
	currentLifeCycle: number;
	toolState: number;
	optionState: {
		showGrid: boolean;
		fullScreen: boolean;
	};
	cameraPos: { x: number; y: number };
	mousePos: { x: number; y: number };
	zoom: number;
	selectedObjectUUID: string | null;
	setSelectedObjectUUID: (value: string | null) => void;
	setCameraPos: (value: { x: number; y: number }) => void;
	setMousePos: (value: { x: number; y: number }) => void;
	setZoom: (value: number) => void;
	setMouseIsEnterViewer: (value: boolean) => void;
	setCurrentLifeCycle: (value: number) => void;
	setToolState: (value: number) => void;
	setOptionState: (value: { showGrid: boolean; fullScreen: boolean }) => void;
}

export interface objects {
	objectDatas: { [uuid: string]: SandObject | SandCamera | SandScene };
	objectTree: objectTreeNode[];
	setObjectDatas: (data: { [uuid: string]: SandObjectBase }) => void;
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
	selectedWorkMenu: number;
	setWorkMenu: (data: file[]) => void;
	setSelectedWorkMenu: (index: number) => void;
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

export interface objectTreeNode {
	uuid: string;
	children: objectTreeNode[];
}

export type TreePos = number[];
