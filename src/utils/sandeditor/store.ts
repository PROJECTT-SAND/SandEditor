export const createStore = <T>(props: T) => {
	let store: T = props;

	for (let key in props) {
		store[`_${key}` as keyof typeof store] = props[key];
		Object.defineProperty(store, key, {
			get() {
				return this[`_${key}` as keyof typeof store];
			},

			set(value) {
				this[`_${key}` as keyof typeof store] = value;
			},
		});
	}

	return store;
};
