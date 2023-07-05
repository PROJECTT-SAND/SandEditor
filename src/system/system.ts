import { EventEmitter } from '@/classes';
import { ProcessEvent, KeyboardEvent, KeyType } from '@/constants';
import { useBoundStore } from '@/store';
import log from './log';

const { setCurrentLifeCycle } = useBoundStore.getState();

export const commands: { [key: string]: any } = {
	sys: {
		start: { type: 'command', args: [], label: 'Start the system' },
		pause: { type: 'command', args: [], label: 'Pause the system' },
		stop: { type: 'command', args: [], label: 'Stop the system' },
	},
};

useBoundStore.subscribe((state) => {
	if (state.currentLifeCycle == 5) {
		stopSystem();
	}
});

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
		callback: Function,
		options?: {
			keyType?: KeyType[];
			shift?: boolean;
			alt?: boolean;
			ctrl?: boolean;
			//--
			once?: boolean;
			capture?: false;
			passive?: false;
		}
	) => {
		let listenerOption: {
			once?: boolean;
			capture?: boolean;
			passive?: boolean;
		} = {};

		if (options?.once !== undefined) {
			listenerOption.once = options.once;
		}
		if (options?.capture !== undefined) {
			listenerOption.capture = options.capture;
		}
		if (options?.passive !== undefined) {
			listenerOption.passive = options.passive;
		}

		keyboardEventTarget.addEventListener(
			type,
			(e) => {
				if (options?.keyType !== undefined) {
					if (options.keyType.every((key) => key !== e.detail.keyCode)) {
						return;
					}
				}
				if (options?.alt !== undefined) {
					if (options?.alt !== e.detail.altKey) {
						return;
					}
				}
				if (options?.ctrl !== undefined) {
					if (options?.ctrl !== e.detail.ctrlKey) {
						return;
					}
				}
				if (options?.shift !== undefined) {
					if (options?.shift !== e.detail.shiftKey) {
						return;
					}
				}
				callback(e.detail);
			},
			listenerOption
		);
		keyboard.callbacks.push(callback);
	},
};

const getObject = () => {
	return window.threeScene.getObjectByProperty('uuid', '1');
};

const resetObjPos = () => {
	const { objectDatas } = useBoundStore.getState();

	for (let uuid in objectDatas) {
		let sceneObj = window.threeScene.getObjectByProperty('uuid', uuid);

		if (!sceneObj) return;

		sceneObj.position.x = objectDatas[uuid].X;
		sceneObj.position.y = objectDatas[uuid].Y;
	}
};

let requestID: number;

const setProcessEvent = () => {
	processEventTarget.dispatchEvent(ProcessEvent.Start);
	update();
};

const update = () => {
	requestID = requestAnimationFrame(update);
	processEventTarget.dispatchEvent(ProcessEvent.Update);
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
	document.addEventListener('keyup', (e) => {
		keyboardEventTarget.dispatchEvent(KeyboardEvent.Up, e);
	});
};

const removeKeyboardEvent = () => {
	document.removeEventListener('keydown', onKeyDown);

	keyboard.callbacks.forEach((callback) => {
		keyboardEventTarget.removeEventListener(KeyboardEvent.Press, callback);
		keyboardEventTarget.removeEventListener(KeyboardEvent.Down, callback);
	});
};

document.body;

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
const obj = getObject();
let speedX = 0;
let speedY = 0;
const speedJump = 17;
let isJumping = false;

let key = {}
Object.keys(KeyType).forEach((keyType) => {
  key[keyType] = false;
})

keyboard.on(KeyboardEvent.Press, (e) => {
  Object.entries(KeyType).forEach(([keyType, keyCode]) => {
    if(e.keyCode == keyCode) {
      key[keyType] = true;
    }
  })
})

keyboard.on(KeyboardEvent.Up, (e) => {
  Object.entries(KeyType).forEach(([keyType, keyCode]) => {
    if(e.keyCode == keyCode) {
      key[keyType] = false;
    }
  })
})

process.on(ProcessEvent.Update, () => {
  if(key.A) {
    speedX = -10;
  }
  if(key.D) {
    speedX = 10;
  }
  if(!key.D && !key.A) {
    speedX = 0;
  }
  if(key.D && key.A) {
    speedX = 0;
  }

  if(!isJumping && key.SpaceBar) {
    isJumping = true;
    speedY = speedJump;
  }

  if(isJumping) {
    speedY -= 1;
  }
  obj.position.x += speedX;
  obj.position.y += speedY;
  if(obj.position.y < 0) {
    speedY = 0;
    obj.position.y = 0;
    isJumping = false;
  }
})
*/

export const system = {
	run: (Props: string) => {
		return new Promise((resolve, reject) => {
			try {
				(async () => {
					const { setCurrentLifeCycle, codeFiles, objectDatas } =
						useBoundStore.getState();

					log.command(Props);
					const prefix = Props.split(' ')[0];
					const command = Props.split(' ')[1];

					if (prefix == 'sys') {
						if (command == 'start') {
							log.text('시스템: 실행 중');
							setCurrentLifeCycle(2);

							for (let key in objectDatas) {
								let objectData = objectDatas[key];
								codeFiles[objectData.controller[0]].contents;
							}

							const context = {
								log,
								process,
								ProcessEvent,
								keyboard,
								KeyboardEvent,
								KeyType,
								getObject,
							};
							const codeContext = `const{${Object.keys(
								context
							).toString()}}=this;`;
							const code = `'use strict';${codeContext + codeFiles.test.contents}`;
							const codeFunc = new Function(code).bind(context);

							try {
								codeFunc();
								playSystem();
							} catch (err) {
								console.error(err);
							}

							log.text('시스템: 실행 완료');
							setCurrentLifeCycle(3);
						} else if (command == 'pause') {
							log.text('시스템: 일시정지');
							setCurrentLifeCycle(4);
						} else if (command == 'stop') {
							log.text('시스템: 중지 중');
							setCurrentLifeCycle(5);
							stopSystem();
							log.text('시스템: 중지 완료');
							setCurrentLifeCycle(1);
						} else {
							log.error('알 수 없는 명령어');
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
