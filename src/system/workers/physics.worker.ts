import Matter from 'matter-js';

const engine = Matter.Engine.create();
window.physicsWorld = engine.world;
const runner = Matter.Runner.create();

const idByUuid: Record<string, number> = {};

const getBodyByUUID = (uuid: string) => {
	const id = idByUuid[uuid];

	return Matter.Composite.get(window.physicsWorld, id, '');
};

//TODO - enabled 여부를 후에 참조해야 한다면 class의 flag, 설정만 한다면 함수겠지
// engine.enabled = false;

//TODO - 굳이 모든 기능에 새로 함수로 래핑해서 export 할 필요가 있을까 싶음, 다른 곳에서 모듈을 import 해도 꼬이지 않을까, 그냥 클래스 자체를 export 해버릴까, 다른 모듈화 코드 참조
//TODO - 문제는 Matter.Body 인수인데 따로 또 함수를 만들어서 할까 아니면 다른 파일에서 모듈 import를 해서 boddies를 만들게 할까
//FIXME - 물리 관련 속성과 scene 속성을 다 포함한 새로운 class를 만들어야 되려나
//@ts-ignore
self.addEventListener(
	'addBody',
	(e: Event & { detail: { body: Matter.Body; uuid: string } }) => {
		const { body, uuid } = e.detail;

		idByUuid[uuid] = body.id;

		body.label = uuid;
		Matter.Composite.add(window.physicsWorld, body);
	}
);

//@ts-ignore
self.addEventListener(
	'removeBody',
	(e: Event & { detail: { uuid: string } }) => {
		const { uuid } = e.detail;

		Matter.Composite.remove(window.physicsWorld, getBodyByUUID(uuid));
	}
);

self.addEventListener('startRunner', () => {
	Matter.Runner.start(runner, engine);
});

self.addEventListener('stopRunner', () => {
	Matter.Runner.stop(runner);
});
