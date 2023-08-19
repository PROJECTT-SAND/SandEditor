import { SandObject } from '@/classes';
import { KeyType, ProcessEvent } from '@/constants';
import { useBoundStore } from '@/store';
import ErrorStackParser from 'error-stack-parser';
import log from '@/system/log';
import { Input, Process } from '@/system/clientObjects';
import { removeEvents, setEvents } from '@/system/eventManager';
import { startPhysics, stopPhysics } from '@/system/physics';
import { resetObjPos } from '@/system/renderer';

export default () => {
	const { setCurrentLifeCycle, codeFiles, objectDatas } =
		useBoundStore.getState();

	log.text('시스템: 실행 중');
	setCurrentLifeCycle(2);

	// const codeFunc: Function[] = [];
	let codeFunc: { code: string; context: any }[] = [];

	// 각 오브젝트의 컨트롤러 함수생성
	for (let key in objectDatas) {
		let objectData = objectDatas[key];
		if (!(objectData instanceof SandObject)) continue;

		// 각 컨트롤러마다 context가 달라짐
		for (let controller of objectData.controller) {
			let file = codeFiles[controller];
			let objectValue = window.threeScene.getObjectByProperty(
				'uuid',
				objectData.UUID
			);

			const getObject = () => {
				return objectValue;
			};

			const newNumberArg = (name: string, min: number, max: number) => {
				return file.params.find((param) => param.label == name);
			};

			const context = {
				log,
				Process,
				ProcessEvent,
				Input,
				InputEvent,
				KeyType,
				getObject,
				newNumberArg,
			};

			const codeContext = `
        'use strict';
        const {${Object.keys(context).toString()}} = this;
        let window = undefined, document = undefined, location = undefined, URL = undefined, history = undefined, alert = undefined, prompt = undefined, confirm = undefined, setInterval = undefined, setTimeout = undefined;
        `;

			let code = codeContext.concat(file.contents);

			codeFunc.push({ code, context });
		}
	}

	try {
		const executeSandCode = () => {
			for (const { code, context } of codeFunc) {
				let func: Function = new Function(code).bind(context);
				func();
			}
		};

		setEvents();
		executeSandCode();
		startPhysics();
	} catch (err) {
		if (err instanceof Error) {
			let stack = ErrorStackParser.parse(err);
			let callIndex = stack.findIndex(
				(stack) => stack.functionName === 'executeSandCode'
			);

			stack = stack.slice(0, callIndex);

			log.error(`[test.sand] ${err.name}: ${err.message}`);
			stack.forEach((stack) => {
				log.error(`at ${stack.functionName}()`);
			});
		}
		console.error(err);

		removeEvents();
		resetObjPos();
		stopPhysics();

		log.error(`시스템: 에러가 발생하여 실행을 중지합니다`);
		setCurrentLifeCycle(1);
	}

	log.text('시스템: 실행 완료');
	setCurrentLifeCycle(3);
};
