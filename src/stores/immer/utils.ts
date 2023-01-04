import { writable } from 'svelte/store';

export type Action = {
	type: string;
	payload?: any;
};

export function createImmerReducerStore(initialState: any, reducer: any) {
	const { update, subscribe } = writable(initialState);

	function dispatch(action: Action) {
		update((state) => {
			return reducer(state, action);
		});
	}

	return { subscribe, dispatch };
}
