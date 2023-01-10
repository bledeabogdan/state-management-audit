import { makeObservable, observable, action } from 'mobx';
import type {
	CurrentQuestionData,
	CurrentSurveyState,
	QuestionData,
	QuestionsState,
	ResponseData
} from '../types';

const initialState: CurrentSurveyState = {
	id: 0,
	questions: [],
	currentQuestion: {
		id: 0,
		responses: []
	}
};

export class CurrentQuestionStore {
	id: number;
	responses: ResponseData[];

	constructor(id: number, responses: ResponseData[]) {
		makeObservable(this, {
			id: observable,
			responses: observable,
			setCurrentQuestion: action,
			addResponse: action,
			clearCurrentQuestion: action
		});

		this.id = id;
		this.responses = responses;
	}

	setCurrentQuestion(questionId: number) {
		this.id = questionId;
		this.responses = [];
	}

	addResponse(response: ResponseData) {
		this.responses.push(response);
	}

	clearCurrentQuestion() {
		this.id = 0;
		this.responses = [];
	}
}

export class CurrentSurveyStore {
	id = 0;
	questions: QuestionsState = [];
	currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	constructor(initialState: CurrentSurveyState) {
		makeObservable(this, {
			id: observable,
			questions: observable,
			currentQuestion: observable,
			addQuestion: action,
			setCurrentSurvey: action,
			clearCurrentSurvey: action,
			setCurrentQuestion: action,
			addResponse: action
		});

		this.id = initialState.id;
		this.questions = initialState.questions;
	}

	addQuestion(question: QuestionData) {
		this.questions.push(question);
	}

	setCurrentSurvey(surveyId: number) {
		this.id = surveyId;
	}

	clearCurrentSurvey() {
		this.id = 0;
		this.questions = [];
		this.currentQuestion.id = 0;
		this.currentQuestion.responses = [];
	}

	setCurrentQuestion(id: number) {
		this.currentQuestion.id = id;
		this.currentQuestion.responses = [];
	}

	addResponse(response: ResponseData) {
		this.currentQuestion.responses = this.currentQuestion.responses.concat(response);
	}
}

export const store = new CurrentSurveyStore(initialState);
