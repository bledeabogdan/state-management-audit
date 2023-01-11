import { assign, createMachine, interpret } from 'xstate';
import type { CurrentSurveyState, QuestionData, ResponseData } from './types';

type Context = CurrentSurveyState;

type Events =
	| { type: 'ADD_QUESTION'; question: QuestionData }
	| { type: 'SET_CURRENT_QUESTION'; id: number }
	| { type: 'ADD_RESPONSE'; response: ResponseData }
	| {
			type: 'SET_CURRENT_SURVEY';
			id: number;
	  }
	| { type: 'SET_CURRENT_QUESTION'; id: number }
	| { type: 'CLEAR' };

export const currentSurveyMachine = createMachine<Context, Events>({
	id: 'currentSurvey',
	predictableActionArguments: true,
	initial: 'active',
	context: {
		id: 0,
		questions: [],
		currentQuestion: {
			id: 0,
			responses: []
		}
	},
	states: {
		active: {
			on: {
				ADD_QUESTION: {
					actions: assign({
						questions: (context, event) => [...context.questions, event.question]
					})
				},
				SET_CURRENT_QUESTION: {
					actions: assign({
						currentQuestion: (_, event) => ({ id: event.id, responses: [] })
					})
				},
				ADD_RESPONSE: {
					actions: assign({
						currentQuestion: (context, event) => ({
							id: context.currentQuestion.id,
							responses: [...context.currentQuestion.responses, event.response]
						})
					})
				},

				CLEAR: {
					target: 'inactive'
				}
			}
		},
		inactive: {
			entry: assign({
				id: 0,
				questions: [],
				currentQuestion: {
					id: 0,
					responses: []
				}
			}),
			on: {
				SET_CURRENT_SURVEY: {
					target: 'active',
					actions: assign({
						id: (_, event) => event.id
					})
				}
			}
		}
	}
});

export const currentSurveyService = interpret(currentSurveyMachine).start();
