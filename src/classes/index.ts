import { useBoundStore } from '@/store';
import { addSceneObject } from '@/system/renderer';
import { v4 as uuidv4 } from 'uuid';

// 클래스 타입 보고 처리하면 되니까 type는 그냥 집어 치자
// https://stackoverflow.com/questions/69831102/multiple-type-predicates-in-typescript
export class SandObjectBase {
	name: string;
	// type: OBJECT_TYPE;
	parentUUID: string | null;
	UUID: string;

	constructor(name: string, parentUUID: string | null) {
		this.UUID = uuidv4();
		this.name = name;
		// this.type = type;
		this.parentUUID = parentUUID;
	}
}

export class SandCamera extends SandObjectBase {
	X: number;
	Y: number;
	zoom: number;
	fov: number;
	near: number;
	far: number;

	constructor(
		name: string,
		sceneUUID: string,
		zoom: number,
		fov: number,
		near: number,
		far: number
	) {
		super(name, sceneUUID);
		this.X = 0;
		this.Y = 0;
		this.zoom = zoom;
		this.fov = fov;
		this.near = near;
		this.far = far;
		addSceneObject(this);
	}
}

export class SandScene extends SandObjectBase {
	background: string = '111111';

	constructor(name: string) {
		super(name, null);
		addSceneObject(this);
	}
}

export class SandObject extends SandObjectBase {
	X: number;
	Y: number;
	visible: boolean = true;
	controller: string[];

	constructor(name: string, parentUUID: string | null, visible?: boolean) {
		const { objectDatas, setObjectDatas } = useBoundStore.getState();

		super(name, parentUUID);
		this.X = 0;
		this.Y = 0;
		this.controller = [];

		if (visible) {
			this.visible = visible;
		}

		addSceneObject(this);
		setObjectDatas({ ...objectDatas, [this.UUID]: this });
	}
}

export class EventEmitter<T extends number> {
	target: EventTarget;

	constructor() {
		this.target = new EventTarget();
	}

	resetEventListener() {
		this.target = new EventTarget();
	}

	addEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | AddEventListenerOptions | undefined
	) {
		return this.target.addEventListener(type.toString(), callback, options);
	}

	removeEventListener(
		type: T,
		callback: EventListenerOrEventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined
	) {
		return this.target.removeEventListener(type.toString(), callback, options);
	}

	dispatchEvent(type: T, detail?: any) {
		return this.target.dispatchEvent(
			new CustomEvent(type.toString(), { detail, cancelable: true })
		);
	}
}
