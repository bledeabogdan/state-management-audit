import { makeObservable, observable, action } from 'mobx';
import type { SurveyData, SurveysState } from '../types';

const initialState: SurveysState = [];

class SurveysStore {
	surveys: SurveysState = [];

	constructor(initialState: SurveysState) {
		makeObservable(this, {
			surveys: observable,
			addSurvey: action
		});
		this.surveys = initialState;
	}

	addSurvey(survey: SurveyData) {
		this.surveys.push(survey);
	}

	deleteSurvey(surveyId: number) {
		const filteredSurveys = this.surveys.filter((s) => s.id !== surveyId);
		this.surveys = filteredSurveys;
	}
}

export const store = new SurveysStore(initialState);
