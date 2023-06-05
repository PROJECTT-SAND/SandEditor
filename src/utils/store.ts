import { createStore } from './sandeditor/store';

let asdf = createStore<{
	name: string;
	tmp: any;
}>({
	name: 'sandediter',
	tmp: null,
});

export default asdf;
