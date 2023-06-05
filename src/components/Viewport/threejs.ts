import {
	codes,
	objects,
	logs,
	viewerController,
	selectedObject,
} from '@/types';
import { Object as ObjectData } from '@/classes';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

const objValue: { [key: string]: OBJ } = {};
const objects: THREE.Object3D<THREE.Event>[] = [];
let storeValue: viewerController & objects & logs & codes & selectedObject;
let canvasElement: HTMLCanvasElement;

const Ctx = {
	Width: window.innerWidth,
	Height: window.innerHeight,
};

let isOBJDragable = false;

let renderer: THREE.WebGLRenderer;
const textureLoader = new THREE.TextureLoader();

let intersects: THREE.Intersection<OBJ>[] = [];
let hovered: { [key: string]: THREE.Intersection<OBJ> } = {};
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const scene1 = new THREE.Scene();
// const scene2 = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	Ctx.Width / Ctx.Height,
	0.1,
	1000
);
camera.position.z = 700;

class OBJ extends THREE.Mesh {
	material: THREE.MeshBasicMaterial;
	dataUuid: string;

	constructor(X: number, Y: number, UUID: string) {
		super();
		this.geometry = new THREE.CircleGeometry(15, 32);
		this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
		this.position.x = X;
		this.position.y = Y;
		this.dataUuid = UUID;
	}

	onPointerOver(e: PointerEvent) {}

	onPointerOut(e: PointerEvent) {}

	onClick(e: MouseEvent) {}

	onDragStart() {
		this.material.color.setHex(0x123456);
	}

	onDragEnd() {
		this.material.color.setHex(0xeeeeee);
	}
}

export const pointerMoveEvent = (e: PointerEvent) => {
	mouse.set((e.offsetX / Ctx.Width) * 2 - 1, -(e.offsetY / Ctx.Height) * 2 + 1);
	raycaster.setFromCamera(mouse, camera);
	intersects = raycaster.intersectObjects(scene1.children, true);

	Object.keys(hovered).forEach((key) => {
		const hit = intersects.find((hit) => hit.object.uuid === key);
		const isNewHoveredItem = hit === undefined;

		if (isNewHoveredItem) {
			const hoveredItem = hovered[key];
			hoveredItem.object.onPointerOut(e);
			delete hovered[key];
		}
	});

	intersects.forEach((hit) => {
		if (!hovered[hit.object.uuid]) {
			hovered[hit.object.uuid] = hit;
			hit.object.onPointerOver(e);
		}
	});
};

export const clickEvent = (e: MouseEvent) => {
	intersects.forEach((hit) => {
		if (hit.object.onClick) hit.object.onClick(e);
	});
};

let controls: DragControls;

export const setStoreValue = (
	value: viewerController & objects & logs & codes & selectedObject
) => {
	storeValue = value;

	if (storeValue.selectedObjectUUID) {
		let obj = objValue[storeValue.selectedObjectUUID];
		let objData = storeValue.objectDatas[storeValue.selectedObjectUUID];

		obj.position.x = objData.X;
		obj.position.y = objData.Y;
	}

	isOBJDragable =
		storeValue.toolState === 1 && storeValue.currentLifeCycle != 3;

	if (controls) controls.enabled = storeValue.toolState == 1;
};

export const createScene = (el: HTMLCanvasElement) => {
	canvasElement = el;

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvasElement,
	});
	renderer.autoClear = false;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;

	controls = new DragControls(objects, camera, renderer.domElement);

	controls.addEventListener('dragstart', (e) => {
		e.object.onDragStart();
	});

	controls.addEventListener('dragend', (e) => {
		e.object.onDragEnd();

		storeValue.setObjectDatas({
			...storeValue.objectDatas,
			[e.object.dataUuid]: {
				...storeValue.objectDatas[e.object.dataUuid],
				X: e.object.position.x,
				Y: e.object.position.y,
			},
		});
	});

	resize();
	render();
};

export const initScene = () => {
	const objectDatas = storeValue.objectDatas;

	for (const uuid in objectDatas) {
		addObject(objectDatas[uuid]);
	}
};

const addObject = (object: ObjectData) => {
	objValue[object.UUID] = new OBJ(object.X, object.Y, object.UUID);
	scene1.add(objValue[object.UUID]);
	objects.push(objValue[object.UUID]);
};

const resize = () => {
	Ctx.Width = canvasElement.clientWidth;
	Ctx.Height = canvasElement.clientHeight;
	renderer.setSize(Ctx.Width, Ctx.Height);
	camera.aspect = Ctx.Width / Ctx.Height;
	camera.updateProjectionMatrix();
};

const render = () => {
	requestAnimationFrame(render);
	renderer.clear();
	// renderer.render(scene2, camera);
	// renderer.clearDepth();
	renderer.render(scene1, camera);
};
