import log from '@/system/log';
import sys from './modules/sys';
import { sandCommand } from '@/types';

export const commands: Record<string, Record<string, sandCommand>> = {
	sys,
};

new Worker('a');

//TODO - 과연 promise를 쓸 필요가 있을까
export const system = {
	run: (Props: string) => {
		return new Promise((resolve, reject) => {
			try {
				(async () => {
					log.command(Props);

					let cmd: any = commands;
					let props = Props.split(' ');

					for (let i = 0; i < props.length; i++) {
						const item = props[i];
						cmd = cmd[item];

						if (!cmd) {
							log.error('알 수 없는 명령어');
							reject('알 수 없는 명령어');
							return;
						}
					}

					cmd.func();
					resolve(null);
				})();
			} catch {
				reject(null);
			}
		});
	},
};
