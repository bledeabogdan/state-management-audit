export interface SurveyData {
	id: number;
	name: string;
}

export interface QuestionData {
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

export interface CurrentQuestionData {
	id: number;
	responses: ResponseData[];
}

export interface CurrentSurveyState {
	id: number;
	questions: QuestionsState;
	currentQuestion: CurrentQuestionData;
}

export type DesignTabState = 'responses' | 'routings';
export type SurveysState = SurveyData[];
export type QuestionsState = QuestionData[];
