import { ProcessEvent, InputEvent, KeyType } from '@/constants';
import {
	keyStates,
	inputEventTarget,
	processEventTarget,
} from './eventManager';

export const Process = {
	on: (type: ProcessEvent, callback: () => any) => {
		if (!processEventTarget)
			throw new Error('Process.on(): processEventTarget이 없음');

		processEventTarget.addEventListener(type, callback);
	},
};

interface InputEventOptions {
	keyType?: KeyType[] | KeyType;
	shift?: boolean;
	alt?: boolean;
	ctrl?: boolean;
	once?: boolean;
}

export const Input = {
	getKeyHold: (keyType: KeyType) => {
		return keyStates.hold.has(keyType);
	},
	getKeyUp: (keyType: KeyType) => {
		return keyStates.up.has(keyType);
	},
	getKeyDown: (keyType: KeyType) => {
		return keyStates.down.has(keyType);
	},
	on: (
		type: InputEvent,
		callback: (e: globalThis.KeyboardEvent) => any,
		options?: InputEventOptions
	) => {
		if (!inputEventTarget)
			throw new Error('Input.on(): inputEventTarget이 없음');

		const isOptionMeets = (e: KeyboardEvent) => {
			let res = true;

			if (options?.keyType !== undefined) {
				if (typeof options?.keyType === 'object') {
					if (options.keyType.every((key) => key !== e.keyCode)) {
						res = false;
					}
				} else {
					if (options.keyType !== e.keyCode) {
						res = false;
					}
				}
			}
			if (options?.alt !== undefined) {
				if (options?.alt !== e.altKey) {
					res = false;
				}
			}
			if (options?.ctrl !== undefined) {
				if (options?.ctrl !== e.ctrlKey) {
					res = false;
				}
			}
			if (options?.shift !== undefined) {
				if (options?.shift !== e.shiftKey) {
					res = false;
				}
			}

			return res;
		};

		inputEventTarget.addEventListener(
			type,
			(e) => {
				if (isOptionMeets(e) === false) {
					return;
				}
				callback(e);
			},
			{
				once: options?.once,
			}
		);
	},
};
