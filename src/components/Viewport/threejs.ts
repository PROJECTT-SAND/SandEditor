import { Object as ObjectData } from '@/classes';
import { useBoundStore } from '@/store';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

class OBJ extends THREE.Mesh {
	material: THREE.MeshBasicMaterial;

	constructor(X: number, Y: number, UUID: string) {
		super();
		this.geometry = new THREE.CircleGeometry(15, 32);
		this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
		this.position.x = X;
		this.position.y = Y;
		this.uuid = UUID;
	}

	onPointerOver(e: PointerEvent) {}

	onPointerOut(e: PointerEvent) {}

	onClick(e: MouseEvent) {}

	onDragStart() {
		this.material.color.setHex(0xaaaaaa);
	}

	onDragEnd() {
		this.material.color.setHex(0xeeeeee);
	}
}

let isOBJDragable = false;
let store = useBoundStore.getState();
let canvasElem: HTMLCanvasElement;
const Ctx = {
	W: window.innerWidth,
	H: window.innerHeight,
};

let renderer: THREE.WebGLRenderer;
// const textureLoader = new THREE.TextureLoader();
// var threeScene = new THREE.Scene();

window.threeScene = new THREE.Scene();

// const scene1 = new THREE.Scene();
window.threeScene.background = new THREE.Color(0x111111);
// const scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, Ctx.W / Ctx.H, 0.1, 1000);
camera.position.z = 700;

let controls: DragControls;
// let intersects: THREE.Intersection<OBJ>[] = [];
// const hovered: { [key: string]: THREE.Intersection<OBJ> } = {};
// const raycaster = new THREE.Raycaster();
// const mouseVector = new THREE.Vector2();

const wireframeBoxGeo = new THREE.BoxGeometry(1, 1);
const wireframeGeo = new THREE.EdgesGeometry(wireframeBoxGeo);
const wireframeMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
window.threeScene.add(wireframe);

useBoundStore.subscribe((state) => {
	store = state;

	if (store.selectedObjectUUID) {
		let obj = window.threeScene.getObjectByProperty(
			'uuid',
			store.selectedObjectUUID
		);
		if (!obj) return;

		let objData = store.objectDatas[store.selectedObjectUUID];

		obj.position.x = objData.X;
		obj.position.y = objData.Y;

		wireframe.position.x = objData.X;
		wireframe.position.y = objData.Y;
		wireframe.scale.x = 30;
		wireframe.scale.y = 30;
	} else {
		wireframe.scale.x = 0;
		wireframe.scale.y = 0;
	}

	isOBJDragable = store.toolState === 1 && store.currentLifeCycle != 3;

	if (controls) controls.enabled = isOBJDragable;
});

export const createScene = (el: HTMLCanvasElement) => {
	canvasElem = el;

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvasElem,
	});
	renderer.autoClear = false;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;

	controls = new DragControls(
		window.threeScene.children,
		camera,
		renderer.domElement
	);

	controls.addEventListener('dragstart', (e) => {
		e.object.onDragStart();

		store.setSelectedObjectUUID(e.object.uuid);
	});

	controls.addEventListener('dragend', (e) => {
		e.object.onDragEnd();
		e.object.position.x = Math.round(e.object.position.x * 10) / 10;
		e.object.position.y = Math.round(e.object.position.y * 10) / 10;

		store.setObjectDatas({
			...store.objectDatas,
			[e.object.uuid]: {
				...store.objectDatas[e.object.uuid],
				X: e.object.position.x,
				Y: e.object.position.y,
			},
		});
	});

	resize();
	render();
};

export const initScene = () => {
	const objectDatas = store.objectDatas;

	for (const uuid in objectDatas) {
		addSceneObject(objectDatas[uuid]);
	}
};

export const addSceneObject = (object: ObjectData) => {
	let newObj = new OBJ(object.X, object.Y, object.UUID);
	window.threeScene.add(newObj);
};

const resize = () => {
	Ctx.W = canvasElem.clientWidth;
	Ctx.H = canvasElem.clientHeight;

	renderer.setSize(Ctx.W, Ctx.H);
	camera.aspect = Ctx.W / Ctx.H;
	camera.updateProjectionMatrix();
};

const render = () => {
	requestAnimationFrame(render);
	renderer.clear();
	// renderer.render(scene2, camera);
	// renderer.clearDepth();
	renderer.render(window.threeScene, camera);
};
