import { SandCamera, SandObject, SandObjectBase, SandScene } from '@/classes';
import { LIFECYCLE, OBJECT_TYPE, TOOL } from '@/constants';
import { useBoundStore } from '@/store';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import Stats from 'stats.js';
import { SandObjectTypes } from '@/types';
import { addPhysicsBody, getPhysics } from './physics';

/* ------------------------------------------------------------------------- */
// ANCHOR Classes
/* ------------------------------------------------------------------------- */

class OBJ extends THREE.Mesh {
	material: THREE.MeshBasicMaterial;

	constructor(X: number, Y: number, UUID: string, visible?: boolean) {
		super();
		this.geometry = new THREE.CircleGeometry(15, 32);
		this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
		this.position.x = X;
		this.position.y = Y;
		this.position.z = 0;
		this.uuid = UUID;
		this.material.transparent = true;
		if (visible) this.visible = visible;
	}

	onPointerOver(e: MouseEvent) {}

	onPointerOut(e: MouseEvent) {}

	onClick(e: MouseEvent) {}

	onDragStart() {
		this.material.opacity = 0.5;
	}

	onDragEnd() {
		this.material.opacity = 1;
	}
}

/* ------------------------------------------------------------------------- */
// ANCHOR Constants
/* ------------------------------------------------------------------------- */

let store = useBoundStore.getState();
let isHandDragging = false;

// NOTE - Threejs
let canvasElem: HTMLCanvasElement;
let wrapperElem: HTMLDivElement;
let renderer: THREE.WebGLRenderer;
// const textureLoader = new THREE.TextureLoader();
window.threeScene = new THREE.Scene();
const uiScene = new THREE.Scene();
uiScene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
camera.position.z = 1000;
// FIXME - 핵심요소의 uuid를 각각 그냥 변수에 담는건 너무 주먹구구식?
let SceneObjectUUID: string;
let CameraObjectUUID: string;

// NOTE - Camera, Ctx
const vFOV = THREE.MathUtils.degToRad(camera.fov);
const cameraHeight = 2 * Math.tan(vFOV / 2) * 1000;
let cameraWidth = cameraHeight * camera.aspect;
const Ctx = new THREE.Vector2(0, 0);
const mouseVector = new THREE.Vector2(0, 0);
const prevCameraPos = new THREE.Vector2(0, 0);
const mouseDragStartPos = new THREE.Vector2(0, 0);
const cameraPos = new THREE.Vector2(0, 0);
const cameraFov = new THREE.Vector2(0, 0);

// NOTE - Object search
let controls: DragControls;
const raycaster = new THREE.Raycaster();
let hoveredObjects: THREE.Intersection<OBJ>[];
const hovered: { [key: string]: THREE.Intersection<OBJ> } = {};

/* ------------------------------------------------------------------------- */
// ANCHOR Default objects
/* ------------------------------------------------------------------------- */

const wireframe = new THREE.LineSegments(
	new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1)),
	new THREE.LineBasicMaterial({ color: 0xaaaaaa })
);
window.threeScene.add(wireframe);

const gridHelper = new THREE.GridHelper(10000, 10000 / 100, 0x555555, 0x333333);
gridHelper.rotation.x = Math.PI / 2;
uiScene.add(gridHelper);
gridHelper.visible = false;

// const axesHelper = new THREE.AxesHelper(100000);
// axesHelper.material.transparent = true;
// axesHelper.material.opacity = 0.5;
// axesHelper.setColors();
// uiScene.add(axesHelper);

// const stats = new Stats();
// stats.showPanel(0);
// document.body.appendChild(stats.dom);

// const material = new THREE.LineBasicMaterial({
// 	color: 0x0000ff,
// });

// const geometry = new THREE.BufferGeometry().setFromPoints([
// 	new THREE.Vector3(0, cameraHeight / 2, 0),
// 	new THREE.Vector3(0, cameraHeight / -2, 0),
// ]);
// const line = new THREE.Line(geometry, material);

// // geometry.attributes.

// window.threeScene.add(line);

/* ------------------------------------------------------------------------- */
// ANCHOR Subscribe store
/* ------------------------------------------------------------------------- */
// FIXME - subscribewithselector 이용하여도 원하는 방식의 선택 방식이 아님
//FIXME - 전역 store에 다 때려박으니 복잡해짐, 따로 class를 만들어서 각 기능을 모아두고 그걸 import 할 필요 있음
useBoundStore.subscribe((state) => {
	store = state;
});

// NOTE - Window 리사이징
useBoundStore.subscribe(
	(state) => state.optionState.FullScreen,
	() => {
		setTimeout(() => {
			resizeEvent();
		}, 10);
	}
);

// NOTE - 그리드핼퍼 보이기 여부
useBoundStore.subscribe(
	(state) => state.optionState.ShowGrid,
	(showGrid) => {
		gridHelper.visible = showGrid;
		camera.updateProjectionMatrix();
	}
);

// NOTE - 움직임 컨트롤 활성화 여부 설정
useBoundStore.subscribe(
	(state) => {
		return {
			toolState: state.toolState,
			currentLifeCycle: state.currentLifeCycle,
		};
	},
	(state) => {
		if (controls)
			controls.enabled =
				state.toolState === TOOL.Move &&
				state.currentLifeCycle === LIFECYCLE.IDLE;
	}
);

// NOTE - wireframe 설정
useBoundStore.subscribe(
	(state) => {
		return {
			selectedObjectUUID: state.selectedObjectUUID,
			currentLifeCycle: state.currentLifeCycle,
		};
	},
	(state) => {
		if (
			state.currentLifeCycle == LIFECYCLE.RUNNING ||
			!state.selectedObjectUUID
		) {
			setWireframe(0, 0, 0, 0);
		} else {
			let obj = getObjectByUUID(state.selectedObjectUUID);

			if (obj) {
				setWireframe(obj.position.x, obj.position.y, 30, 30);
			} else {
				setWireframe(0, 0, 0, 0);
			}
		}
	}
);

// NOTE - objectDatas를 scene object에 적용시키기
useBoundStore.subscribe(
	(state) => state.objectDatas,
	// (state) => [state.selectedObjectUUID, state.objectDatas],
	// {
	// 	return {
	// 		selectedObjectUUID: state.selectedObjectUUID,
	// 		objectDatas: state.objectDatas,
	// 	};
	// }
	(objectDatas) => {
		Object.keys(objectDatas).forEach((uuid) => {
			let objData = objectDatas[uuid];

			//if (objData.type == OBJECT_TYPE.Object) {
			if (objData instanceof SandObject) {
				let obj = getObjectByUUID(uuid);
				if (obj === undefined) return;

				obj.position.x = objData.X;
				obj.position.y = objData.Y;
				obj.visible = objData.visible;
				//} else if (objData.type == OBJECT_TYPE.Camera) {
			} else if (objData instanceof SandCamera) {
				camera.position.x = objData.X;
				camera.position.y = objData.Y;
				camera.zoom = objData.zoom;
				camera.fov = objData.fov;
				camera.near = objData.near;
				camera.far = objData.far;
				//} else if (objData.type == OBJECT_TYPE.Scene) {
			} else if (objData instanceof SandScene) {
				// window.threeScene.background = objData.background;
			}
		});

		// for (const uuid in objectDatas) {
		// 	let objData = objectDatas[uuid];

		// 	//if (objData.type == OBJECT_TYPE.Object) {
		// 	if (objData instanceof SandObject) {
		// 		let obj = getObjectByUUID(uuid);
		// 		if (obj === undefined) continue;

		// 		obj.position.x = objData.X;
		// 		obj.position.y = objData.Y;
		// 		obj.visible = objData.visible;
		// 		//} else if (objData.type == OBJECT_TYPE.Camera) {
		// 	} else if (objData instanceof SandCamera) {
		// 		camera.position.x = objData.X;
		// 		camera.position.y = objData.Y;
		// 		camera.zoom = objData.zoom;
		// 		camera.fov = objData.fov;
		// 		camera.near = objData.near;
		// 		camera.far = objData.far;
		// 		//} else if (objData.type == OBJECT_TYPE.Scene) {
		// 	} else if (objData instanceof SandScene) {
		// 		// window.threeScene.background = objData.background;
		// 	}
		// }
	}
);

/* ------------------------------------------------------------------------- */
// ANCHOR Event functions
/* ------------------------------------------------------------------------- */

const clickEvent = (e: MouseEvent) => {
	hoveredObjects.forEach((hit) => {
		if (hit.object.onClick) hit.object.onClick(e);
	});
};

const mousemoveEvent = (e: MouseEvent) => {
	searchHoveredObjects(e);

	if (isHandDragging) {
		applyHandDraggingtoCamera(e.offsetX, e.offsetY);
	}

	store.setMousePos({
		x: cameraPos.x + ((e.offsetX - Ctx.x / 2) / Ctx.x) * cameraFov.x,
		y: cameraPos.y + (-(e.offsetY - Ctx.y / 2) / Ctx.y) * cameraFov.y,
	});
};

const mousedownEvent = (e: MouseEvent) => {
	if (store.mouseIsEnterViewer && store.toolState === TOOL.Hand) {
		isHandDragging = true;
		prevCameraPos.set(camera.position.x, camera.position.y);
		mouseDragStartPos.set(e.offsetX, e.offsetY);
	}
};

const mouseupEvent = (e: MouseEvent) => {
	if (isHandDragging) isHandDragging = false;
};

const wheelEvent = (e: WheelEvent) => {
	if (!CameraObjectUUID) return;

	camera.zoom =
		Math.round(
			camera.zoom * (1 + (e.deltaY / Math.abs(e.deltaY) / 6) * -1) * 100
		) / 100;
	camera.updateProjectionMatrix();

	let tmp = store.objectDatas[CameraObjectUUID];
	if (!(tmp instanceof SandCamera)) return;

	tmp.zoom = camera.zoom;

	store.setObjectDatas({
		...store.objectDatas,
		[CameraObjectUUID]: tmp,
	});

	store.setZoom(camera.zoom);
};

const resizeEvent = () => {
	if (!wrapperElem || !renderer) return;
	Ctx.set(wrapperElem.clientWidth, wrapperElem.clientHeight);

	camera.aspect = Ctx.x / Ctx.y;
	cameraWidth = cameraHeight * camera.aspect;
	cameraFov.set(cameraWidth, cameraHeight);
	camera.updateProjectionMatrix();

	renderer.setSize(Ctx.x, Ctx.y);
};

const dragstartEvent = (e: THREE.Event) => {
	let uuid = e.object.uuid;
	let obj = getObjectByUUID(uuid);
	let objData = store.objectDatas[uuid];

	if (!obj || !(objData instanceof SandObject)) return;

	e.object.onDragStart();
	store.setSelectedObjectUUID(uuid);

	obj.position.x = objData.X;
	obj.position.y = objData.Y;
	setWireframe(objData.X, objData.Y, 30, 30);
};

const dragendEvent = (e: THREE.Event) => {
	let obj = e.object;
	let objData = store.objectDatas[e.object.uuid];
	let posX = Math.round(obj.position.x * 10) / 10;
	let posY = Math.round(obj.position.y * 10) / 10;

	if (!obj || !(objData instanceof SandObject)) return;

	obj.onDragEnd();
	obj.position.x = posX;
	obj.position.y = posY;
	objData.X = posX;
	objData.Y = posY;
	setWireframe(posX, posY, 30, 30);

	store.setObjectDatas({
		...store.objectDatas,
		[obj.uuid]: objData,
	});
};

/* ------------------------------------------------------------------------- */
// ANCHOR Functions
/* ------------------------------------------------------------------------- */

const searchHoveredObjects = (e: MouseEvent) => {
	mouseVector.set(e.offsetX, -e.offsetY);
	mouseVector.divide(Ctx).multiplyScalar(2);
	mouseVector.set(mouseVector.x - 1, mouseVector.y + 1);
	raycaster.setFromCamera(mouseVector, camera);
	hoveredObjects = raycaster.intersectObjects(window.threeScene.children, true);

	// NOTE - add
	for (let i = 0; i < hoveredObjects.length; i++) {
		const intersect = hoveredObjects[i];
		const obj = intersect.object;

		if (!hovered[obj.uuid]) {
			hovered[obj.uuid] = intersect;
			if (obj.onPointerOver) obj.onPointerOver(e);
		}
	}

	// NOTE - delete
	Object.keys(hovered).forEach((key) => {
		const hit = hoveredObjects.find(
			(intersect) => intersect.object.uuid === key
		);

		if (hit === undefined) {
			const hoveredItem = hovered[key];

			if (hoveredItem.object.onPointerOut) hoveredItem.object.onPointerOut(e);
			delete hovered[key];
		}
	});
};

const applyHandDraggingtoCamera = (offsetX: number, offsetY: number) => {
	cameraPos.set(mouseDragStartPos.x - offsetX, offsetY - mouseDragStartPos.y);
	cameraPos
		.divide(Ctx)
		.multiply(cameraFov)
		.divideScalar(camera.zoom)
		.add(prevCameraPos);

	store.setCameraPos({ x: cameraPos.x, y: cameraPos.y });

	camera.position.x = cameraPos.x;
	camera.position.y = cameraPos.y;

	store.setObjectDatas({
		...store.objectDatas,
		[CameraObjectUUID]: {
			...store.objectDatas[CameraObjectUUID],
			X: cameraPos.x,
			Y: cameraPos.y,
		},
	});
};

const getObjectByUUID = (uuid: string) => {
	return window.threeScene.getObjectByProperty('uuid', uuid);
};

const setWireframe = (x: number, y: number, sizeX: number, sizeY: number) => {
	wireframe.position.x = x;
	wireframe.position.y = y;
	wireframe.scale.x = sizeX;
	wireframe.scale.y = sizeY;
};

//TODO - store랑 export 함수랑 기능이 겹치는 상황, renderer wrap 클래스를 새로 만들기, 다른 코드 참조
export const setCameraPos = (x: number, y: number) => {
	camera.position.x = x;
	camera.position.y = y;
};

export const resetObjPos = () => {
	const { objectDatas } = useBoundStore.getState();

	Object.keys(objectDatas).forEach((uuid) => {
		let sceneObj = window.threeScene.getObjectByProperty('uuid', uuid);
		let objData = objectDatas[uuid];

		if (!sceneObj || !(objData instanceof SandObject)) return;

		sceneObj.position.x = objData.X;
		sceneObj.position.y = objData.Y;
	});
};

export const createScene = (el: HTMLCanvasElement, wrap: HTMLDivElement) => {
	canvasElem = el;
	wrapperElem = wrap;

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvasElem,
	});
	renderer.autoClear = false;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;

	controls = new DragControls(window.threeScene.children, camera, canvasElem);

	canvasElem.addEventListener('click', clickEvent);
	canvasElem.addEventListener('mousemove', mousemoveEvent);
	canvasElem.addEventListener('mousedown', mousedownEvent);
	canvasElem.addEventListener('mouseup', mouseupEvent);
	canvasElem.addEventListener('wheel', wheelEvent);
	window.addEventListener('resize', resizeEvent);
	controls.addEventListener('dragstart', dragstartEvent);
	controls.addEventListener('dragend', dragendEvent);

	setWireframe(0, 0, 0, 0);
	initObjects();
	resizeEvent();
	render();
};

const initObjects = () => {
	const objectDatas = store.objectDatas;

	Object.keys(objectDatas).forEach((uuid) => {
		addSceneObject(objectDatas[uuid]);
	});
};

//FIXME - instanceof 기준 판단은 구린 면이 있음, switch문 사용 가능 필요, 매번 타입체킹을 해도 구리고, 다른 코드들 참고해야될듯
// const objectTypeChecker = (object: SandObjectTypes) => {
// 	if (object instanceof SandScene) {
// 		return object as SandScene;
// 	} else if (object instanceof SandCamera) {
// 		return object as SandCamera;
// 	} else if (object instanceof SandObject) {
// 		return object as SandObject;
// 	}
// };

export const addSceneObject = (object: SandObjectTypes) => {
	if (object instanceof SandScene) {
		SceneObjectUUID = object.UUID;
	} else if (object instanceof SandCamera) {
		CameraObjectUUID = object.UUID;
	} else if (object instanceof SandObject) {
		let newObj = new OBJ(object.X, object.Y, object.UUID, object.visible);
		window.threeScene.add(newObj);
	}
};

const applyPhysics = () => {
	let bodies = getPhysics();
	for (let i = 0; i < bodies.length; i++) {
		const item = bodies[i];
		const object = getObjectByUUID(item.label);

		if (!object) throw new Error('render(): 물리 오브젝트가 없음');

		object.position.set(item.position.x, item.position.y, 0);
		object.rotateX(item.angle);
	}
};

const render = () => {
	// stats.begin();
	requestAnimationFrame(render);

	applyPhysics();

	renderer.clear();
	renderer.render(uiScene, camera);
	renderer.clearDepth();
	renderer.render(window.threeScene, camera);
	// stats.end();
};
