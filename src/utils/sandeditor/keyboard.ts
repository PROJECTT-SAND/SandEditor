import { Keyboard } from '@/constants';
import { KeyboardEvent } from '@/classes';

export default class _ {
	static on(type: KeyboardEvent, callback: (e: KeyboardEvent) => any) {
		callback(KeyboardEvent);
	}
}

export const onKeyPress = (
	key: Keyboard,
	callback: (event: KeyboardEvent) => any
) => {
	callback(new KeyboardEvent());
};

export const onKeyDown = (callback: (event: KeyboardEvent) => any) => {
	callback(new KeyboardEvent());
};
