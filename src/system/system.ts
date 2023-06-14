import { EventEmitter } from '@/classes';
import { ProcessEvent, KeyboardEvent } from '@/constants';
import { useBoundStore } from '@/store';
import log from './log';

const { objectDatas, setCurrentLifeCycle } = useBoundStore.getState();

const processEventTarget = new EventEmitter<ProcessEvent>();
const keyboardEventTarget = new EventEmitter<KeyboardEvent>();

const process = {
	callbacks: [],

	on: (
		type: ProcessEvent,
		callback: EventListenerOrEventListenerObject | null
	) => {
		processEventTarget.addEventListener(type, callback);
		process.callbacks.push(callback);
	},
};
const keyboard = {
	callbacks: [],

	on: (
		type: KeyboardEvent,
		callback: EventListenerOrEventListenerObject | null
	) => {
		keyboardEventTarget.addEventListener(type, callback);
		keyboard.callbacks.push(callback);
	},
};

const getObject = () => {
	return window.threeScene.getObjectByProperty('uuid', '1');
};

const resetObjPos = () => {
	for (let uuid in objectDatas) {
		let sceneObj = window.threeScene.getObjectByProperty('uuid', uuid);

		if (!sceneObj) return;
		sceneObj.position.x = objectDatas[uuid].X;
		sceneObj.position.y = objectDatas[uuid].Y;
	}
};

let requestID: number;

const setProcessEvent = () => {
	requestID = requestAnimationFrame(setProcessEvent);
	processEventTarget.dispatchEvent(ProcessEvent.Update);

	const { currentLifeCycle } = useBoundStore.getState();

	if (currentLifeCycle == 5) {
		stopSystem();
	}
};

const removeProcessEvent = () => {
	cancelAnimationFrame(requestID);
	process.callbacks.forEach((callback) => {
		processEventTarget.removeEventListener(ProcessEvent.Start, callback);
		processEventTarget.removeEventListener(ProcessEvent.Update, callback);
	});
};

let onKeyDown = (e: globalThis.KeyboardEvent) => {
	keyboardEventTarget.dispatchEvent(KeyboardEvent.Down, e);
	if (!e.repeat) keyboardEventTarget.dispatchEvent(KeyboardEvent.Press, e);
};

const setKeyboardEvent = () => {
	document.addEventListener('keydown', onKeyDown);
};

const removeKeyboardEvent = () => {
	document.removeEventListener('keydown', onKeyDown);

	keyboard.callbacks.forEach((callback) => {
		keyboardEventTarget.removeEventListener(KeyboardEvent.Press, callback);
		keyboardEventTarget.removeEventListener(KeyboardEvent.Down, callback);
	});
};

const playSystem = () => {
	setKeyboardEvent();
	setProcessEvent();
};

const stopSystem = () => {
	removeProcessEvent();
	removeKeyboardEvent();
	resetObjPos();
};

/*
let obj = getObject();
let asdf = 0;
let aaahelpme = 0.1;
// log.text(JSON.stringify(obj));


process.on(ProcessEvent.Start, () => {
  obj.scale.x = 10;
});

process.on(ProcessEvent.Update, () => {
	asdf += aaahelpme;

	obj.position.x = Math.sin(asdf) * 200;
	obj.position.y = Math.cos(asdf) * 200;
});

keyboard.on(KeyboardEvent.Press, (e) => {
    console.log(e.detail.key);

    if(e.detail.key == 'w') {
        aaahelpme += 0.01;
    }
    if(e.detail.key == 's') {
        aaahelpme -= 0.01;
    }
});
*/

export const system = {
	run: (Props: string) => {
		return new Promise((resolve, reject) => {
			try {
				(async () => {
					const { setCurrentLifeCycle, codeFiles } = useBoundStore.getState();

					log.command(Props);
					const prefix = Props.split(' ')[0];
					const command = Props.split(' ')[1];

					if (prefix == 'sys') {
						if (command == 'start') {
							log.text('시스템: 실행 중');
							setCurrentLifeCycle(2);

							const context = {
								log,
								process,
								ProcessEvent,
								keyboard,
								KeyboardEvent,
								getObject,
							};
							const codeContext = `const{${Object.keys(
								context
							).toString()}}=this;`;
							const code = `${codeContext + codeFiles.test.contents}`;
							const codeFunc = new Function(code).bind(context);

							try {
								playSystem();
								codeFunc();
							} catch (err) {
								console.error(err);
							}

							log.text('시스템: 실행 완료');
							setCurrentLifeCycle(3);
						}
						if (command == 'pause') {
							log.text('시스템: 일시정지');
							setCurrentLifeCycle(4);
						}
						if (command == 'stop') {
							log.text('시스템: 중지 중');
							setCurrentLifeCycle(5);
							stopSystem();
							log.text('시스템: 중지 완료');
							setCurrentLifeCycle(1);
						}
					} else {
						log.error('알 수 없는 명령어');
					}
					resolve(null);
				})();
			} catch {
				reject();
			}
		});
	},
};
