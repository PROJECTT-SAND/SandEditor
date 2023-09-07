import { EventEmitter } from '@/classes';
import { ProcessEvent, InputEvent, KeyType } from '@/constants';

export const keyStates = {
	hold: new Set<number>(),
	down: new Set<number>(),
	up: new Set<number>(),
};

export let processEventTarget: EventEmitter<ProcessEvent> | null = null;
export let inputEventTarget: EventEmitter<
	InputEvent,
	globalThis.KeyboardEvent
> | null = null;

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
	keyStates.down.clear();
	keyStates.up.clear();
};

const onKeyDown = (e: globalThis.KeyboardEvent) => {
	if (!inputEventTarget)
		throw new Error('onKeyDown(): inputEventTarget이 없음');

	inputEventTarget.dispatchEvent(InputEvent.Hold, e);
	if (!e.repeat) inputEventTarget.dispatchEvent(InputEvent.Down, e);
};

const onKeyUp = (e: globalThis.KeyboardEvent) => {
	if (!inputEventTarget) throw new Error('onKeyUp(): inputEventTarget이 없음');

	inputEventTarget.dispatchEvent(InputEvent.Up, e);
};

/* ------------------------------------------------------------------------- */
// ANCHOR Set event
/* ------------------------------------------------------------------------- */

const setInputEvent = () => {
	document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);

	inputEventTarget = new EventEmitter<InputEvent, globalThis.KeyboardEvent>();

	inputEventTarget.addEventListener(InputEvent.Hold, (e) => {
		keyStates.hold.add(e.keyCode);
	});
	inputEventTarget.addEventListener(InputEvent.Down, (e) => {
		keyStates.down.add(e.keyCode);
	});
	inputEventTarget.addEventListener(InputEvent.Up, (e) => {
		keyStates.up.add(e.keyCode);
		keyStates.hold.delete(e.keyCode);
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
