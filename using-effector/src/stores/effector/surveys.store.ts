import { createStore, createEvent } from 'effector';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

export const addSurvey = createEvent<SurveyData>();
export const deleteSurvey = createEvent<number>();
export const clear = createEvent();

export const surveys = createStore<SurveysState>(initialState)
	.on(addSurvey, (state, survey) => state.concat(survey))
	.on(deleteSurvey, (state, id) => state.filter((s) => s.id !== id))
	.on(clear, () => initialState);
