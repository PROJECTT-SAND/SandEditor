import { SandObject, SandObjectBase } from '@/classes';
import { LIFECYCLE, OBJECT_TYPE, TOOL } from '@/constants';
import { useBoundStore } from '@/store';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import Stats from 'stats.js';

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

let store = useBoundStore.getState();
let canvasElem: HTMLCanvasElement;
let wrapperElem: HTMLDivElement;
let renderer: THREE.WebGLRenderer;
// const textureLoader = new THREE.TextureLoader();
window.threeScene = new THREE.Scene();
const uiScene = new THREE.Scene();
uiScene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
camera.position.z = 1000;

let controls: DragControls;
const raycaster = new THREE.Raycaster();
let intersects: THREE.Intersection<OBJ>[];
let hovered: { [key: string]: THREE.Intersection<OBJ> } = {};

let isMove = false;
const vFOV = THREE.MathUtils.degToRad(camera.fov);
const cameraHeight = 2 * Math.tan(vFOV / 2) * 1000;
let cameraWidth = cameraHeight * camera.aspect;

const Ctx = new THREE.Vector2(0, 0);
const mouseVector = new THREE.Vector2(0, 0);
const prevCameraPos = new THREE.Vector2(0, 0);
const mouseMoveStart = new THREE.Vector2(0, 0);
const posOffset = new THREE.Vector2(0, 0);
const cameraFov = new THREE.Vector2(0, 0);

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

// ----------------------------------------------------------------
// ----------------------------------------------------------------

// selector
useBoundStore.subscribe((state)  => {
	// Option fullScreen
	resize();
}, A)

useBoundStore.subscribe((state) => {
	store = state;

	// Set wireframe
	if (
		state.currentLifeCycle == LIFECYCLE.RUNNING ||
		!state.selectedObjectUUID
	) {
		setWireframe(0, 0, 0, 0);
	} else {
		let obj = getObjectByUUID(state.selectedObjectUUID);

		if (obj) {
			setWireframe(obj.position.x, obj.position.x, 30, 30);
		} else {
			setWireframe(0, 0, 0, 0);
		}
	}

	// Apply objectDatas to scene object
	for (const uuid in state.objectDatas) {
		let objData = state.objectDatas[uuid];
		if (objData.type !== OBJECT_TYPE.Object) continue;
		let obj = getObjectByUUID(uuid);
		if (obj == undefined) continue;

		obj.position.x = objData.X;
		obj.position.y = objData.Y;
		obj.visible = objData.visible;
	}

	// Tool move controll
	if (controls)
		controls.enabled =
			state.toolState === TOOL.Move &&
			state.currentLifeCycle === LIFECYCLE.IDLE;
    
    // ShowGrid
	gridHelper.visible = state.optionState.showGrid;

	// Camera zoom
	// camera.zoom = state.zoom;
	// camera.updateProjectionMatrix();
});

const getObjectByUUID = (uuid: string) => {
	return window.threeScene.getObjectByProperty('uuid', uuid);
};

const setWireframe = (x: number, y: number, sizeX: number, sizeY: number) => {
	wireframe.position.x = x;
	wireframe.position.y = y;
	wireframe.scale.x = sizeX;
	wireframe.scale.y = sizeY;
};

const clickEvent = (e: MouseEvent) => {
	intersects.forEach((hit) => {
		if (hit.object.onClick) hit.object.onClick(e);
	});

	if (intersects.length == 0) {
		setWireframe(0, 0, 0, 0);
		store.setSelectedObjectUUID(null);
	}
};

const mousemoveEvent = (e: MouseEvent) => {
	mouseVector.set(e.offsetX, -e.offsetY);
	mouseVector.divide(Ctx).multiplyScalar(2);
	mouseVector.set(mouseVector.x - 1, mouseVector.y + 1);
	raycaster.setFromCamera(mouseVector, camera);
	intersects = raycaster.intersectObjects(window.threeScene.children, true);

	// add
	for (let intersect of intersects) {
		let obj = intersect.object;

		if (!hovered[obj.uuid]) {
			hovered[obj.uuid] = intersect;
			if (obj.onPointerOver) obj.onPointerOver(e);
		}
	}

	// delete
	for (let key in hovered) {
		let hit = intersects.find((intersect) => intersect.object.uuid === key);

		if (hit === undefined) {
			let hoveredItem = hovered[key];

			if (hoveredItem.object.onPointerOut) hoveredItem.object.onPointerOut(e);
			delete hovered[key];
		}
	}

	// handTool control
	if (isMove) {
		posOffset.set(mouseMoveStart.x - e.offsetX, e.offsetY - mouseMoveStart.y);
		posOffset
			.divide(Ctx)
			.multiply(cameraFov)
			.divideScalar(store.zoom)
			.add(prevCameraPos);

		store.setCameraPos({ x: posOffset.x, y: posOffset.y });

		camera.position.x = posOffset.x;
		camera.position.y = posOffset.y;
	}

	store.setMousePos({ x, y })
};

const mousedownEvent = (e: MouseEvent) => {
	if (store.mouseIsEnterViewer && store.toolState === TOOL.Hand) {
		isMove = true;
		prevCameraPos.set(camera.position.x, camera.position.y);
		mouseMoveStart.set(e.offsetX, e.offsetY);
	}
};

const mouseupEvent = (e: MouseEvent) => {
	if (isMove) isMove = false;
};

const wheelEvent = (e: WheelEvent) => {
	store.setZoom(Math.round(store.zoom * (1 + (e.deltaY / Math.abs(e.deltaY) / 6) * -1) *100) / 100)
}

const dragstartEvent = (e: THREE.Event) => {
	let uuid = e.object.uuid;
	let obj = getObjectByUUID(uuid);
	let objData = store.objectDatas[uuid];

	if (!obj) return;

	e.object.onDragStart();
	store.setSelectedObjectUUID(uuid);

	obj.position.x = objData.X;
	obj.position.y = objData.Y;

	setWireframe(objData.X, objData.Y, 30, 30);
};

const dragendEvent = (e: THREE.Event) => {
	let obj = e.object;
	let posX = Math.round(obj.position.x * 10) / 10;
	let posY = Math.round(obj.position.y * 10) / 10;

	if (!obj) return;

	obj.onDragEnd();
	obj.position.x = posX;
	obj.position.y = posY;

	setWireframe(posX, posY, 30, 30);

	store.setObjectDatas({
		...store.objectDatas,
		[obj.uuid]: {
			...store.objectDatas[obj.uuid],
			X: posX,
			Y: posY,
		},
	});
};

const resize = () => {
	if (!wrapperElem || !renderer) return;
	Ctx.set(wrapperElem.clientWidth, wrapperElem.clientHeight);

	camera.aspect = Ctx.x / Ctx.y;
	cameraWidth = cameraHeight * camera.aspect;
	cameraFov.set(cameraWidth, cameraHeight);
	camera.updateProjectionMatrix();

	renderer.setSize(Ctx.x, Ctx.y);
};

export const setCameraPos = (x: number, y: number) => {
	camera.position.x = x;
	camera.position.y = y;
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------

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
	canvasElem.addEventListener('wheel', wheelEvent)
	window.addEventListener('resize', resize);
	controls.addEventListener('dragstart', dragstartEvent);
	controls.addEventListener('dragend', dragendEvent);

	setWireframe(0, 0, 0, 0);
	initObjects();
	resize();
	render();
};

const initObjects = () => {
	const objectDatas = store.objectDatas;

	for (const uuid in objectDatas) {
		if (objectDatas[uuid].type !== OBJECT_TYPE.Object) return;
		if (objectDatas[uuid] instanceof SandObject) return;

		addSceneObject(objectDatas[uuid]);
	}
};

export const addSceneObject = (object: SandObject) => {
	let newObj = new OBJ(object.X, object.Y, object.UUID, object.visible);
	window.threeScene.add(newObj);
};

const render = () => {
	// stats.begin();
	requestAnimationFrame(render);
	renderer.clear();
	renderer.render(uiScene, camera);
	renderer.clearDepth();
	renderer.render(window.threeScene, camera);
	// stats.end();
};
