import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

interface command {
	type: string;
	props: any[];
}

let callStack: command[] = [
	{ type: 'loop', props: [10, { type: 'moveX', props: [10] }] },
];

`
loop(10) {
  moveX(10)
}
`;

// const [isStart, setIsStart] = useState(false);
// const [isGrid, setIsGrid] = useState(false);
const objValue: { [key: string]: OBJ } = {};
const objects: THREE.Object3D<THREE.Event>[] = [];
let storeValue;
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
	constructor() {
		super();
		this.geometry = new THREE.CircleGeometry(15, 32);
		this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });

		objValue[this.uuid] = this;
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

export const createScene = (el: HTMLCanvasElement) => {
	canvasElement = el;

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvasElement,
	});
	renderer.autoClear = false;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;

	const controls = new DragControls(objects, camera, renderer.domElement);

	controls.addEventListener('dragstart', (e) => {
		e.object.onDragStart();
	});

	controls.addEventListener('dragend', (e) => {
		e.object.onDragEnd();
	});

	resize();
	render();
	test();
};

export const setStoreValue = (as: any) => {
	storeValue = as;
	isOBJDragable =
		storeValue.toolState === 1 && storeValue.currentLifeCycle != 3;
};

const test = () => {
	const newObject = new OBJ();

	scene1.add(newObject);
	objects.push(newObject);
};

const resize = () => {
	Ctx.Width = canvasElement.clientWidth;
	Ctx.Height = canvasElement.clientHeight;
	renderer.setSize(Ctx.Width, Ctx.Height);
	camera.aspect = Ctx.Width / Ctx.Height;
	camera.updateProjectionMatrix();
};

let callStackIndex = 0;
let loopIndex = 0;
let currentCall: any = null;
let callType = currentCall?.type;
let callProps = currentCall?.props;
let requestAnimationID;

const render = () => {
	requestAnimationID = requestAnimationFrame(render);

	// if (currentCall === null) {
	// 	currentCall = callStack[callStackIndex];
	// 	callStackIndex += 1;
	// }

	// if (currentCall === undefined) {
	// 	cancelAnimationFrame(requestAnimationID);
	// 	return;
	// }

	// callType = currentCall.type;
	// callProps = currentCall.props;

	// if (callType == 'loop') {
	// 	loopIndex = callProps[0];
	// 	currentCall = callProps[1];
	// }
	// if (callType == 'moveX') {
	// 	objects[0].position.x += callProps[0];
	// }

	renderer.clear();
	// renderer.render(scene2, camera);
	// renderer.clearDepth();
	renderer.render(scene1, camera);
};
