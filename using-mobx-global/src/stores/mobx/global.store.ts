import { CurrentQuestionStore, CurrentSurveyStore } from './current-survey-mobx-class.store';
import { SurveysStore } from './surveys-mobx-class.store';

class AppStore {
	surveysStore: SurveysStore;
	currentSurveyStore: CurrentSurveyStore;
	currentQuestionStore: CurrentQuestionStore;

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
		this.currentQuestionStore = new CurrentQuestionStore(0, []);
	}

	clear() {
		this.surveysStore.clear();
		this.currentQuestionStore.clearCurrentQuestion();
		this.currentSurveyStore.clearCurrentSurvey();
	}
}

export const appStore = new AppStore();
