export interface SurveyData {
	id: number;
	name: string;
}

interface QuestionData {
	id: number;
	shortcut: string;
	mainCaption: string;
}

export interface ResponseData {
	id: number;
	questionId: number;
	mainCaption: string;
}

export interface GlobalState {
	surveys: SurveysState;
	currentSurvey: CurrentSurveyState;
	currentTabPanel: DesignTabState;
}

interface CurrentSurveyState {
	id: number;
	questions: QuestionsState;
	currentQuestion: {
		id: number;
		responses: ResponseData[];
	};
}

export type DesignTabState = 'questions' | 'responses';
export type SurveysState = SurveyData[];
export type QuestionsState = QuestionData[];
