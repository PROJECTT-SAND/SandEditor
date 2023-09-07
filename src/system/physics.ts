const worker = new Worker(
	new URL('./workers/physics.worker.ts', import.meta.url)
);

const dispatchEvent = (type: string, data?: any) => {
	worker.dispatchEvent(new CustomEvent(type, { detail: data }));
};

worker.onerror = (e) => {
	worker.terminate();
	console.error(e);
};

export const addPhysicsBody = (body: Matter.Body, uuid: string) => {
	dispatchEvent('addBody', { body, uuid });
};

export const removePhysicsBody = (uuid: string) => {
	dispatchEvent('removeBody', { uuid });
};

export const startPhysics = () => {
	dispatchEvent('startRunner');
};

export const stopPhysics = () => {
	dispatchEvent('stopRunner');
};
