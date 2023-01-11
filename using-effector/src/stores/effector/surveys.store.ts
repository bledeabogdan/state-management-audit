import { createStore, createApi } from 'effector';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

export const surveys = createStore<SurveysState>(initialState);

const addSurvey = (surveys: SurveysState, survey: SurveyData) => surveys.concat(survey);
const clear = () => initialState;
const deleteSurvey = (surveys: SurveysState, id: number) => surveys.filter((s) => s.id !== id);

export const surveysApi = createApi(surveys, {
	addSurvey,
	deleteSurvey,
	clear
});
