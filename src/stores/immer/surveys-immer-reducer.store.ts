import type { SurveysState, SurveyData } from '../types.js';
import produce from 'immer';
import { createImmerReducerStore } from './utils.js';

const initialState: SurveysState = [];

type SurveyAction = {
	type: string;
	payload?: SurveyData | number;
};

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

export const store = createImmerReducerStore(initialState, reducer);
