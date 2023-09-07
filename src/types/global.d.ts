export {};

declare global {
	interface Window {
		// threeScene: THREE.Scene;
		physicsWorld: Matter.World;
	}
}
