import { writable } from 'svelte/store';
import produce from 'immer';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

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
		accumulator[actionName] = (payload: SurveyData | number) =>
			store.update((state) => produce<SurveysState>(actions[actionName])(state, payload));

		return accumulator;
	}, {});

	return {
		actions: mappedActions,
		subscribe: store.subscribe
	};
}

export const store = createSurveysStore(initialState, actions);
