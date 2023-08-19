import { useBoundStore } from '@/store';
import log from '@/system/log';

export default () => {
	const { setCurrentLifeCycle } = useBoundStore.getState();

	log.text('시스템: 일시정지');
	setCurrentLifeCycle(4);
};
