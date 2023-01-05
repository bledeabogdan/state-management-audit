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

class CurrentQuestion {
	id: number;
	responses: ResponseData[];

	constructor(id: number, responses: ResponseData[]) {
		makeObservable(this, {
			id: observable,
			responses: observable,
			setCurrentQuestion: action,
			addResponse: action
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

class CurrentSurveyStore {
	id = 0;
	questions: QuestionsState = [];
	currentQuestion: CurrentQuestion;

	constructor(initialState: CurrentSurveyState) {
		makeObservable(this, {
			id: observable,
			questions: observable,
			currentQuestion: observable,
			addQuestion: action
		});

		this.currentQuestion = new CurrentQuestion(
			initialState.currentQuestion.id,
			initialState.currentQuestion.responses
		);
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
		this.currentQuestion.clearCurrentQuestion();
	}
}

export const store = new CurrentSurveyStore(initialState);
