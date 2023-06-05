import { Object } from '@/classes';

export interface viewerController {
	mouseIsEnterViewer: boolean;
	isGrid: boolean;
	currentLifeCycle: number;
	toolState: number;
	optionState: object;
	setMouseIsEnterViewer: (value: boolean) => void;
	setCurrentLifeCycle: (value: number) => void;
	setToolState: (value: number) => void;
	setOptionState: (value: object) => void;
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
	logs: any[];
}

export interface codes {
	codes: { [key: string]: String };

	codeFiles: {
		[key: string]: {
			contents: string;
			params: { [key: string]: { type: number; value: any } };
		};
	};

	setCodes: (filename: string, code: string) => void;

	setCodeFiles: (filename: string, data: any) => void;
}

export interface selectedObject {
	selectedObjectUUID: string | null;
	setSelectedObjectUUID: (value: string) => void;
}

export interface objectTreeNode {
	uuid: string;
	children: objectTreeNode[];
}

export type TreePos = number[];
