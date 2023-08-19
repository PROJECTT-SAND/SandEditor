import Matter from 'matter-js';

const engine = Matter.Engine.create();
const runner = Matter.Runner.create();

// const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
// const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
// const ground = Matter.Bodies.rectangle(400, 610, 810, 60, {
// 	isStatic: true,
// });

//TODO - enabled 여부를 후에 참조해야 한다면 class의 flag, 설정만 한다면 함수겠지
// engine.enabled = false;

//TODO - 굳이 모든 기능에 새로 함수로 래핑해서 export 할 필요가 있을까 싶음, 다른 곳에서 모듈을 import 해도 꼬이지 않을까, 그냥 클래스 자체를 export 해버릴까, 다른 모듈화 코드 참조
//TODO - 문제는 Matter.Body 인수인데 따로 또 함수를 만들어서 할까 아니면 다른 파일에서 모듈 import를 해서 boddies를 만들게 할까
//FIXME - 물리 관련 속성과 scene 속성을 다 포함한 새로운 class를 만들어야 되려나
export const addPhysicsBody = (body: Matter.Body, uuid: string) => {
	body.label = uuid;
	Matter.Composite.add(engine.world, body);
};

export const removePhysicsBody = () => {
	// Matter.Composite.remove();
};

export const getPhysics = () => {
	return engine.world.bodies;
};

export const startPhysics = () => {
	Matter.Runner.start(runner, engine);
};

export const stopPhysics = () => {
	Matter.Runner.stop(runner);
};
