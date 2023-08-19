import { sandCommand } from '@/types';
import start from './start';
import pause from './pause';
import stop from './stop';

const command: Record<string, sandCommand> = {
	start: { func: start, args: [], label: 'Start the system' },
	pause: { func: pause, args: [], label: 'Pause the system' },
	stop: { func: stop, args: [], label: 'Stop the system' },
};

export default command;
