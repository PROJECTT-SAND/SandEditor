import { useBoundStore } from '@/store';
import { removeEvents } from '@/system/eventManager';
import log from '@/system/log';
import { stopPhysics } from '@/system/physics';
import { resetObjPos } from '@/system/renderer';

export default () => {
	const { setCurrentLifeCycle } = useBoundStore.getState();

	log.text('시스템: 중지 중');
	setCurrentLifeCycle(5);

	removeEvents();
	resetObjPos();
	stopPhysics();

	log.text('시스템: 중지 완료');
	setCurrentLifeCycle(1);
};
