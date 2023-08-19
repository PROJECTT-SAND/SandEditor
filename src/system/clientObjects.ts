import { ProcessEvent, InputEvent, KeyType } from '@/constants';
import {
	keyStates,
	inputEventTarget,
	processEventTarget,
} from './eventManager';

export const Process = {
	on: (
		type: ProcessEvent,
		callback: EventListenerOrEventListenerObject | null
	) => {
		if (!processEventTarget)
			throw new Error('Process.on(): processEventTarget이 없음');

		processEventTarget.addEventListener(type, callback);
	},
};

//TODO - capture나 passive는 dom이 아니라 필요없을듯
interface InputEventOptions {
	keyType?: KeyType[] | KeyType;
	shift?: boolean;
	alt?: boolean;
	ctrl?: boolean;
	once?: boolean;
	capture?: boolean;
	passive?: boolean;
}

//TODO - 솔직히 이따구로 keyStates 객체를 직접 참조하는거 개구림
export const Input = {
	getKeyHold: (keyType: KeyType) => {
		return keyStates.keyHold[keyType];
	},
	getKeyUp: (keyType: KeyType) => {
		return keyStates.keyUp[keyType];
	},
	getKeyDown: (keyType: KeyType) => {
		return keyStates.keyDown[keyType];
	},
	on: (type: InputEvent, callback: Function, options?: InputEventOptions) => {
		if (!inputEventTarget)
			throw new Error('Input.on(): inputEventTarget이 없음');

		const isOptionMeets = (e: any) => {
			let res = true;

			if (options?.keyType !== undefined) {
				if (typeof options?.keyType === 'object') {
					if (options.keyType.every((key) => key !== e.detail.keyCode)) {
						res = false;
					}
				} else {
					if (options.keyType !== e.detail.keyCode) {
						res = false;
					}
				}
			}
			if (options?.alt !== undefined) {
				if (options?.alt !== e.detail.altKey) {
					res = false;
				}
			}
			if (options?.ctrl !== undefined) {
				if (options?.ctrl !== e.detail.ctrlKey) {
					res = false;
				}
			}
			if (options?.shift !== undefined) {
				if (options?.shift !== e.detail.shiftKey) {
					res = false;
				}
			}

			return res;
		};

		inputEventTarget.addEventListener(
			type,
			(e: any) => {
				//TODO - callback의 e값을 any가 아닌 정확한 타입으로 변경
				if (isOptionMeets(e) === false) {
					return;
				}
				callback(e.detail);
			},
			{
				once: options?.once,
				capture: options?.capture,
				passive: options?.passive,
			}
		);
	},
};
