import produce from 'immer';
import type { CurrentSurveyState, QuestionData, ResponseData } from '../types';
import { createImmerReducerStore, type Action } from './utils';

const initialState: CurrentSurveyState = {
	id: 0,
	questions: [],
	currentQuestion: {
		id: 0,
		responses: []
	}
};

const ADD_QUESTION = 'ADD_QUESTION';
const ADD_RESPONSE = 'ADD_RESPONSE';
const SET_CURRENT_SURVEY = 'SET_CURRENT_SURVEY';
const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const CLEAR_CURRENT_SURVEY = 'CLEAR_CURRENT_SURVEY';

function reducer(state: CurrentSurveyState, action: Action) {
	switch (action.type) {
		case ADD_QUESTION: {
			return produce((draft: CurrentSurveyState) => {
				draft.questions.push(action.payload as QuestionData);
			})(state);
		}
		case SET_CURRENT_SURVEY: {
			return produce((draft: CurrentSurveyState) => {
				draft.id = action.payload as number;
			})(state);
		}
		case SET_CURRENT_QUESTION: {
			return produce((draft: CurrentSurveyState) => {
				draft.currentQuestion.id = action.payload as number;
				draft.currentQuestion.responses = [];
			})(state);
		}
		case ADD_RESPONSE: {
			return produce((draft: CurrentSurveyState) => {
				draft.currentQuestion.responses.push(action.payload as ResponseData);
			})(state);
		}
		case UPDATE_QUESTION: {
			return produce((draft: CurrentSurveyState) => {
				const question = action.payload as QuestionData;
				const questionIndex = draft.questions.findIndex((q) => q.id === question.id);
				if (questionIndex !== -1) {
					draft.questions[questionIndex].mainCaption = question.mainCaption;
					draft.questions[questionIndex].shortcut = question.shortcut;
				}
			})(state);
		}
		case CLEAR_CURRENT_SURVEY: {
			return produce((draft: CurrentSurveyState) => {
				draft.id = 0;
				draft.questions = [];
				draft.currentQuestion = {
					id: 0,
					responses: []
				};
			})(state);
		}
	}
}

export const store = createImmerReducerStore(initialState, reducer);
