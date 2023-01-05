import { makeAutoObservable } from 'mobx';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

function createSurveysStore(initialState: SurveysState) {
	return makeAutoObservable({
		surveys: initialState,
		addSurvey(survey: SurveyData) {
			this.surveys.push(survey);
		},
		deleteSurvey(surveyId: number) {
			const filteredSurveys = this.surveys.filter((s) => s.id !== surveyId);
			this.surveys = filteredSurveys;
		}
	});
}

export const store = createSurveysStore(initialState);
