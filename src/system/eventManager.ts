import { EventEmitter } from '@/classes';
import { ProcessEvent, InputEvent, KeyType } from '@/constants';

//TODO - object방식이 아닌 유효한 키들의 list방식으로 변경
//TODO - 키 상태들을 일일이 참조하는게 아닌 이벤트 export 방식으로 변경
const keyBools: any = Object.values(KeyType).reduce((acc, value) => {
	return { ...acc, [value]: false };
}, {});

export const keyStates = {
	keyHold: { ...keyBools },
	keyDown: { ...keyBools },
	keyUp: { ...keyBools },
};

export let processEventTarget: EventEmitter<ProcessEvent> | null = null;
export let inputEventTarget: EventEmitter<InputEvent> | null = null;

export const setEvents = () => {
	setInputEvent();
	setProcessEvent();
};

export const removeEvents = () => {
	removeProcessEvent();
	removeInputEvent();
};

/* ------------------------------------------------------------------------- */
// ANCHOR Dispatch event
/* ------------------------------------------------------------------------- */

let requestID: number;

const update = () => {
	if (!processEventTarget)
		throw new Error('update(): processEventTarget이 없음');

	requestID = requestAnimationFrame(update);
	processEventTarget.dispatchEvent(ProcessEvent.Update);
	keyStates.keyDown = { ...keyBools };
	keyStates.keyUp = { ...keyBools };
};

let onKeyDown = (e: globalThis.KeyboardEvent) => {
	if (!inputEventTarget)
		throw new Error('onKeyDown(): inputEventTarget이 없음');

	inputEventTarget.dispatchEvent(InputEvent.Hold, e);
	if (!e.repeat) inputEventTarget.dispatchEvent(InputEvent.Down, e);
};

let onKeyUp = (e: globalThis.KeyboardEvent) => {
	if (!inputEventTarget) throw new Error('onKeyUp(): inputEventTarget이 없음');

	inputEventTarget.dispatchEvent(InputEvent.Up, e);
};

/* ------------------------------------------------------------------------- */
// ANCHOR Set event
/* ------------------------------------------------------------------------- */

const setInputEvent = () => {
	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	inputEventTarget = new EventEmitter<InputEvent>();

	inputEventTarget.addEventListener(InputEvent.Hold, (e: any) => {
		keyStates.keyHold[e.detail.keyCode] = true;
	});
	inputEventTarget.addEventListener(InputEvent.Down, (e: any) => {
		keyStates.keyDown[e.detail.keyCode] = true;
	});
	inputEventTarget.addEventListener(InputEvent.Up, (e: any) => {
		keyStates.keyUp[e.detail.keyCode] = true;
		keyStates.keyHold[e.detail.keyCode] = false;
	});
};

const setProcessEvent = () => {
	processEventTarget = new EventEmitter<ProcessEvent>();

	update();
};

/* ------------------------------------------------------------------------- */
// ANCHOR Remove event
/* ------------------------------------------------------------------------- */

const removeProcessEvent = () => {
	cancelAnimationFrame(requestID);

	processEventTarget = null;
};

const removeInputEvent = () => {
	document.removeEventListener('keydown', onKeyDown);
	document.removeEventListener('keyup', onKeyUp);

	inputEventTarget = null;
};

// const resetObjPos = () => {
// 	const { objectDatas } = useBoundStore.getState();

// 	for (let uuid in objectDatas) {
// 		let sceneObj = window.threeScene.getObjectByProperty('uuid', uuid);
//     let data = objectDatas[uuid];

// 		if (!sceneObj || !(data instanceof SandObject)) return;

// 		sceneObj.position.x = data.X;
// 		sceneObj.position.y = data.Y;
// 	}
// };
