import { writable } from 'svelte/store';
import produce from 'immer';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

// actions store

const actions = {
	addSurvey(state: SurveysState, survey: SurveyData) {
		state.push(survey);
	},
	deleteSurvey(state: SurveysState, id: number) {
		const index = state.findIndex((x) => x.id === id);
		if (index !== -1) state.splice(index, 1);
	}
};

function createSurveysStore(initialState: SurveysState, actions: any) {
	const store = writable(initialState);

	const mappedActions = Object.keys(actions).reduce((accumulator: any, actionName: string) => {
		accumulator[actionName] = () =>
			store.update((state) => produce<SurveysState>(actions[actionName])(state));

		return accumulator;
	}, {});

	return {
		actions: mappedActions,
		subscribe: store.subscribe
	};
}

export const store = createSurveysStore(initialState, actions);

type SurveyAction = {
	type: string;
	payload?: SurveyData | number;
};

// actions, reducer store
const ADD_SURVEY = 'ADD_SURVEY';
const DELETE_SURVEY = 'DELETE_SURVEY';

function reducer(state: SurveysState, action: SurveyAction) {
	switch (action.type) {
		case ADD_SURVEY:
			return produce((draft: SurveysState) => {
				draft.push(action.payload as SurveyData);
			})(state);
		case DELETE_SURVEY:
			return produce((draft: SurveysState) => {
				const index = draft.findIndex((x) => x.id === action.payload);
				if (index !== -1) draft.splice(index, 1);
			})(state);
	}
}

function createSurveysStoreReducer(initialState: SurveysState, reducer: any) {
	const { update, subscribe } = writable(initialState);

	function dispatch(action: SurveyAction) {
		update((state) => {
			return reducer(state, action);
		});
	}

	return { subscribe, dispatch };
}

export const storeReducer = createSurveysStoreReducer(initialState, reducer);
