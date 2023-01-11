import { createStore, createEvent, createEffect } from 'effector';
import type { SurveyData, SurveysState } from '../types';
import { fetchSurveys } from '../utils';

const initialState: SurveysState = [];

export const addSurvey = createEvent<SurveyData>();
export const deleteSurvey = createEvent<number>();
export const clear = createEvent();

export const fetchSurveysFx = createEffect<void, any, SurveyData[]>(fetchSurveys);

export const surveys = createStore<SurveysState>(initialState)
	.on(addSurvey, (state, survey) => [...state, survey])
	.on(deleteSurvey, (state, id) => state.filter((s) => s.id !== id))
	.on(clear, () => initialState)
	.on(fetchSurveysFx.doneData, (state, result) => [...state, ...result]);
