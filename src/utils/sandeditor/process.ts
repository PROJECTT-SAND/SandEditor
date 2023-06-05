import { ProcessEvent } from '@/classes';
import { Process } from '@/constants';

export default class _ {
	static on(type: Process, callback: (e: ProcessEvent) => any) {
		callback(ProcessEvent);
	}
}

export const onUpdate = (callback: (event: ProcessEvent) => any) => {
	callback(new ProcessEvent());
};

export const onStart = (callback: (event: ProcessEvent) => any) => {
	callback(new ProcessEvent());
};
