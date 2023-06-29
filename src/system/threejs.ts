import { Object as ObjectData } from '@/classes';
import { LIFECYCLE, TOOL } from '@/constants';
import { useBoundStore } from '@/store';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import Stats from 'stats.js';

class OBJ extends THREE.Mesh {
	material: THREE.MeshBasicMaterial;

	constructor(X: number, Y: number, UUID: string) {
		super();
		this.geometry = new THREE.CircleGeometry(15, 32);
		this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
		this.position.x = X;
		this.position.y = Y;
		this.position.z = 0;
		this.uuid = UUID;
		this.material.transparent = true;
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

const gridHelper = new THREE.GridHelper(10000, 50, 0x555555, 0x333333);
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

useBoundStore.subscribe((state) => {
	store = state;

	if (state.currentLifeCycle == LIFECYCLE.RUNNING) {
		setWireframe(0, 0, 0, 0);
	}

	if (controls)
		controls.enabled =
			state.toolState === TOOL.Move &&
			state.currentLifeCycle === LIFECYCLE.IDLE;

	gridHelper.visible = state.optionState.showGrid;
	camera.zoom = state.zoom;
	camera.updateProjectionMatrix();
});

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

const dragstartEvent = (e: THREE.Event) => {
	let uuid = e.object.uuid;
	let obj = window.threeScene.getObjectByProperty('uuid', uuid);
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
	Ctx.set(canvasElem.clientWidth, canvasElem.clientHeight);
	camera.aspect = Ctx.x / Ctx.y;
	cameraWidth = cameraHeight * camera.aspect;
	cameraFov.set(cameraWidth, cameraHeight);

	renderer.setSize(Ctx.x, Ctx.y);
	camera.updateProjectionMatrix();
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------

export const createScene = (el: HTMLCanvasElement) => {
	canvasElem = el;

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
		addSceneObject(objectDatas[uuid]);
	}
};

export const addSceneObject = (object: ObjectData) => {
	let newObj = new OBJ(object.X, object.Y, object.UUID);
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
