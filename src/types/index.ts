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
	objValue: object;
	setObjValue: (objName: string, pos: object) => void;
}

export interface logs {
	logs: any[];
}

export interface codes {
	codes: any;
}

export interface objectTreeNode {
	uuid: string;
	children: objectTreeNode[];
}

export type TreePos = number[];
