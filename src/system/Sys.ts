import { useBoundStore } from '../store';
import log from './log';
import { VM, VMScript } from 'vm2';
import { moveTo } from '@/utils';

const store = useBoundStore();

export function start() {
	return new Promise(async (resolve, reject) => {
		log.text('시스템: 시작 중');
		store.setPlayerState(2);

		const vm = new VM();
		vm.freeze(moveTo, 'moveTo');
		const script = new VMScript('util.moveTo(10)');
		vm.run(script);

		log.text('시스템: 시작 완료');
		store.setPlayerState(3);
		log.warning('InGame 13번 코드에 오류가 있습니다.');
		resolve(null);
	});
}

export function stop() {
	return new Promise(async (resolve, reject) => {
		log.text('시스템: 종료 중');
		store.setPlayerState(5);

		log.text('시스템: 종료 완료');
		store.setPlayerState(1);
		resolve(null);
	});
}

export function restart() {
	return new Promise(async (resolve, reject) => {
		log.text('시스템: 재시작 중');
		store.setPlayerState(5);

		log.text('시스템: 재시작 완료');
		store.setPlayerState(1);
		resolve(null);
	});
}

export function pause() {
	return new Promise(async (resolve, reject) => {
		log.text('시스템: 일시중지 중');
		store.setPlayerState(5);

		log.text('시스템: 일시중지 완료');
		store.setPlayerState(1);
		resolve(null);
	});
}
