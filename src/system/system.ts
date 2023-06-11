import { EventEmitter } from '@/classes';
import { ProcessEvent } from '@/constants';
import { useBoundStore } from '@/store';
import log from './log';

const { objectDatas } = useBoundStore.getState();

const processEventTarget = new EventEmitter<ProcessEvent>();

const process = {
	callback: null,

	on: (
		type: ProcessEvent,
		callback: EventListenerOrEventListenerObject | null
	) => {
		processEventTarget.addEventListener(type, callback);
		process.callback = callback;
	},

	_off: (type: ProcessEvent) => {
		processEventTarget.removeEventListener(type, process.callback);
	},
};

const resetObjPos = () => {
	for (let uuid in objectDatas) {
		let sceneObj = window.threeScene.getObjectByProperty('uuid', uuid);

		if (!sceneObj) return;
		sceneObj.position.x = objectDatas[uuid].X;
		sceneObj.position.y = objectDatas[uuid].Y;
	}
};

/*
let obj = getObject();
let asdf = 0;
log.text(JSON.stringify(obj));

process.on(ProcessEvent.Update, () => {
	asdf += 0.1;

	obj.position.x = Math.sin(asdf) * 200;
	obj.position.y = Math.cos(asdf) * 200;
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
								threeScene: window.threeScene,
								log,
								process,
								processEventTarget,
								ProcessEvent,
								useBoundStore,
								resetObjPos,
							};
							const codeContext = `
const {threeScene, log, process, processEventTarget, ProcessEvent, useBoundStore, resetObjPos} = this;
const { setCurrentLifeCycle } = useBoundStore.getState();

let requestID;
const _processUpdateFunc = () => {
  const { currentLifeCycle } = useBoundStore.getState();

  requestID = requestAnimationFrame(_processUpdateFunc);
  processEventTarget.dispatchEvent(ProcessEvent.Update);

  if (currentLifeCycle == 5) {
    cancelAnimationFrame(requestID);
    process._off(ProcessEvent.Update);
    resetObjPos();
    log.text('시스템: 중지 완료');
    setCurrentLifeCycle(1);
  }
};
_processUpdateFunc();

const getObject = () => { return threeScene.getObjectByProperty('uuid', '1'); };
// --------------------------------------------------
\n`;
							const code = `${codeContext + codeFiles.test.contents}`;
							const codeFunc = new Function(code).bind(context);

							try {
								codeFunc();
							} catch (err) {
								console.error(err);
							}

							log.text('시스템: 실행 완료');
							setCurrentLifeCycle(3);
							// log.warning('InGame 13번 코드에 오류가 있습니다.');
						}
						if (command == 'pause') {
							log.text('시스템: 일시정지');
							setCurrentLifeCycle(4);
						}
						if (command == 'stop') {
							log.text('시스템: 중지 중');
							setCurrentLifeCycle(5);
							// log.text('시스템: 중지 완료');
							// setCurrentLifeCycle(1);
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
