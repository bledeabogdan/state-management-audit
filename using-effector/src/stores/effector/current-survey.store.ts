import { createStore, createApi } from 'effector';
import type { CurrentSurveyState, QuestionData, ResponseData } from '../types';

const initialState: CurrentSurveyState = {
	id: 0,
	questions: [],
	currentQuestion: {
		id: 0,
		responses: []
	}
};

export const currentSurvey = createStore<CurrentSurveyState>(initialState);

const addQuestion = (state: CurrentSurveyState, question: QuestionData) => ({
	...state,
	questions: [...state.questions, question]
});
const setCurrentSurvey = (state: CurrentSurveyState, id: number) => ({ ...state, id });
const setCurrentQuestion = (state: CurrentSurveyState, id: number) => ({
	...state,
	currentQuestion: {
		id,
		responses: []
	}
});
const addResponse = (state: CurrentSurveyState, response: ResponseData) => ({
	...state,
	currentQuestion: {
		...state.currentQuestion,
		responses: [...state.currentQuestion.responses, response]
	}
});
const clear = () => initialState;

export const currentSurveyApi = createApi(currentSurvey, {
	addQuestion,
	addResponse,
	setCurrentQuestion,
	setCurrentSurvey,
	clear
});
