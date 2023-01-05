import { CurrentSurveyStore } from './current-survey-mobx-class.store';
import { SurveysStore } from './surveys-mobx-class.store';

class AppStore {
	surveysStore: SurveysStore;
	currentSurveyStore: CurrentSurveyStore;

	constructor() {
		this.surveysStore = new SurveysStore([]);
		this.currentSurveyStore = new CurrentSurveyStore({
			id: 0,
			questions: [],
			currentQuestion: {
				id: 0,
				responses: []
			}
		});
	}
}

export const appStore = new AppStore();
