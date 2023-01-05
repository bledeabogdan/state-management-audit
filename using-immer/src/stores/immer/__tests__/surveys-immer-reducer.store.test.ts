import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { store } from '../surveys-immer-reducer.store';

afterEach(() => {
	store.update((value) => (value = []));
});

describe('surveys-immer-reducer', () => {
	const { dispatch } = store;

	describe('when `store` is empty', () => {
		it('should add new survey when dispatching `ADD_SURVEY` action', () => {
			dispatch({
				type: 'ADD_SURVEY',
				payload: {
					id: Math.random(),
					name: 'Name'
				}
			});

			expect(get(store).length).toBe(1);
		});
	});

	describe('when `store` has surveys', () => {
		beforeEach(() => {
			store.update((value) => (value = [{ id: 1, name: 'Name' }]));
		});

		it('should add new survey when dispatching `ADD_SURVEY` action', () => {
			dispatch({
				type: 'ADD_SURVEY',
				payload: {
					id: Math.random(),
					name: 'Name'
				}
			});

			expect(get(store).length).toBe(2);
		});

		it('should delete specific survey when `DELETE_SURVEY` action is dispatched', () => {
			dispatch({
				type: 'DELETE_SURVEY',
				payload: 1
			});

			expect(get(store).length).toBe(0);
		});
	});
});
