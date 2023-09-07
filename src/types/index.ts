import { SandCamera, SandObject, SandObjectBase, SandScene } from '@/classes';
import { LOG_KIND, OPTION } from '@/constants';

export type SandObjectTypes = SandObject | SandScene | SandCamera;

export type sandCommand = { func: Function; args: []; label: string };

// 이걸 꼭 이렇게 타입을 개별 파일로 빼야하나?
export interface viewerController {
	mouseIsEnterViewer: boolean;
	isGrid: boolean;
	currentLifeCycle: number;
	toolState: number;
	optionState: {
		[OPTION.FullScreen]: boolean;
		[OPTION.ShowGrid]: boolean;
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
	setOptionState: (value: {
		[OPTION.ShowGrid]: boolean;
		[OPTION.FullScreen]: boolean;
	}) => void;
}

export interface objects {
	objectDatas: { [uuid: string]: SandObjectTypes };
	objectTree: objectTreeNode[];
	setObjectDatas: (data: { [uuid: string]: SandObjectTypes }) => void;
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
	args: { label: string; type: number; value: any; optional?: boolean }[];
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
